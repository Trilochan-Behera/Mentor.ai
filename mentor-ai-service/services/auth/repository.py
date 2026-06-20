from supabase import Client
from redis import Redis
from typing import Optional, List, Dict, Any

class AuthRepository:
    def __init__(self, db: Client, redis: Optional[Redis] = None):
        self.db = db
        self.redis = redis

    def get_profile_by_email(self, email: str) -> List[Dict[str, Any]]:
        """Queries the permanent Supabase profile database layer for an email record."""
        res = self.db.table("profiles").select("*").eq("email", email).execute()
        return res.data

    def store_temp_registration(self, email: str, otp: str, hashed_pwd: str):
        """caches ephemeral sign-up credentials inside Redis with a 5-minute TTL expiration."""
        if not self.redis:
            raise RuntimeError("Redis cache provider layer is uninitialized.")
        self.redis.setex(f"otp:{email}", 300, otp)
        self.redis.setex(f"temp_pwd:{email}", 300, hashed_pwd)

    def get_otp(self, email: str) -> Optional[str]:
        """Pulls the current dynamic validation token from the in-memory cache."""
        return self.redis.get(f"otp:{email}") if self.redis else None

    def get_temp_pwd(self, email: str) -> Optional[str]:
        """Pulls the temporary secure hash string from the registration session bucket."""
        return self.redis.get(f"temp_pwd:{email}") if self.redis else None

    def create_profile(self, email: str, hashed_password: str) -> List[Dict[str, Any]]:
        """Commits an authenticated credentials row permanently to your storage node."""
        res = self.db.table("profiles").insert({
            "email": email,
            "password": hashed_password,
            "is_verified": True,
            "rank_title": "Novice"
        }).execute()
        return res.data

    def clear_temp_registration(self, email: str):
        """Wipes matching session identifiers from memory immediately upon completion."""
        if self.redis:
            self.redis.delete(f"otp:{email}")
            self.redis.delete(f"temp_pwd:{email}")