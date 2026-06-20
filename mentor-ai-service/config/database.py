import os
import redis
from supabase import create_client, Client
from dotenv import load_dotenv

# Ensure local environment variables are parsed correctly on initialization
load_dotenv()

class DatabaseManager:
    def __init__(self):
        print("🔌 [DATABASE MANAGER] Initializing global cluster connections...")
        
        # 1. Primary Core Engine Connection: Supabase Client
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        
        if not self.supabase_url or not self.supabase_key:
            print("⚠️ [WARN] Supabase credentials are missing from environment scopes.")
            
        self.supabase_client: Client = create_client(self.supabase_url, self.supabase_key)

        # 2. Memory Cache Engine Connection: Upstash Redis Client (For fast OTP/Session states)
        self.redis_url = os.getenv("REDIS_URL")
        if self.redis_url:
            self.redis_client = redis.from_url(self.redis_url, decode_responses=True)
        else:
            print("⚠️ [WARN] Redis connection string URL is unassigned.")
            self.redis_client = None

        # 💡 Future Engines Layer (Add specialized databases here later)
        # self.analytics_db = create_engine("postgresql://...")

    def get_supabase(self) -> Client:
        """Retrieves active connection instances for relational tracking tables."""
        return self.supabase_client

    def get_redis(self):
        """Retrieves volatile in-memory key-value cache pipelines."""
        if not self.redis_client:
            raise RuntimeError("Attempted to access unitialized memory cluster pool.")
        return self.redis_client

# Instantiate a single master engine coordinator pool to preserve resources
db_manager = DatabaseManager()

# ── FASTAPI DEPENDENCY INJECTION PROVIDERS ──
# Services inject these functions to maintain complete decoupling from direct implementations

def get_supabase_db() -> Client:
    """FastAPI Injection dependency targeting core operational records."""
    return db_manager.get_supabase()

def get_redis_client():
    """FastAPI Injection dependency targeting high-speed OTP transactions."""
    return db_manager.get_redis()