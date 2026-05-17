import os
from supabase import create_client, Client
import redis
from dotenv import load_dotenv

load_dotenv()

# Supabase Setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Upstash Redis Setup (For OTPs)
redis_client = redis.from_url(
    os.getenv("REDIS_URL"), 
    decode_responses=True
)

def get_db():
    return supabase

def get_redis():
    return redis_client