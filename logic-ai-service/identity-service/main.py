from fastapi import FastAPI, HTTPException, Depends
from .schemas import SignupRequest, VerifyOTPRequest
from .database import get_db, get_redis
import random
import smtplib
from email.mime.text import MIMEText
from .auth_utils import send_otp_email, hash_password, verify_password # Added hashing utility imports
from fastapi.middleware.cors import CORSMiddleware
from fastapi import BackgroundTasks # Import this at the top


app = FastAPI(title="LOGIC.ai Identity Service")

# Configure CORS correctly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
)

@app.post("/auth/signup")
async def signup(payload: SignupRequest, background_tasks: BackgroundTasks, db=Depends(get_db), redis=Depends(get_redis)):
    # 1. Existing database check (Fast)
    existing_user = db.table("profiles").select("email").eq("email", payload.email).execute()
    if existing_user.data:
        raise HTTPException(status_code=400, detail="You are already registered with this email.")

    otp = str(random.randint(100000, 999999))
    hashed_pwd = hash_password(payload.password)
    
    # 2. Store in Redis (Fast, takes < 5 milliseconds)
    redis.setex(f"otp:{payload.email}", 300, otp)
    redis.setex(f"temp_pwd:{payload.email}", 300, hashed_pwd)
    
    # 3. Use BackgroundTasks to offload the slow email process!
    background_tasks.add_task(send_otp_email, payload.email, otp)
    
    # 4. Return immediately to the mobile app
    return {"status": "success", "message": "OTP sent to email"}

@app.post("/auth/verify")
async def verify(payload: VerifyOTPRequest, db=Depends(get_db), redis=Depends(get_redis)):
    # 1. Validate OTP
    stored_otp = redis.get(f"otp:{payload.email}")
    if not stored_otp or stored_otp != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # 2. Safety Check: Ensure they haven't somehow registered via a parallel session while typing OTP
    existing_user = db.table("profiles").select("email").eq("email", payload.email).execute()
    if existing_user.data:
        raise HTTPException(
            status_code=400, 
            detail="You are already registered with this email. Kindly login, not signup."
        )

    # 3. Retrieve Hashed Password and Create Permanent Profile
    hashed_password = redis.get(f"temp_pwd:{payload.email}")
    if not hashed_password:
        raise HTTPException(status_code=400, detail="Registration session expired. Please sign up again.")
    
    try:
        user_data = db.table("profiles").insert({
            "email": payload.email,
            "password": hashed_password,  # Securely stored string hash
            "is_verified": True,
            "rank_title": "Novice"
        }).execute()
        
        # 4. Cleanup Redis
        redis.delete(f"otp:{payload.email}")
        redis.delete(f"temp_pwd:{payload.email}")
        
        return {"status": "authorized", "user": user_data.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/auth/login")
async def login(payload: SignupRequest, db=Depends(get_db)):
    # 1. Search for user profile row data
    user = db.table("profiles").select("*").eq("email", payload.email).execute()
    
    # 2. STEP 1: If email is completely missing from Supabase
    if not user.data:
        raise HTTPException(
            status_code=404, 
            detail="The email is not authorized. Kindly check your email or signup with this email for login."
        )
    
    # 3. STEP 2: The email was found, now exclusively check if password matching logic fails
    stored_hashed_password = user.data[0]['password']
    if not verify_password(payload.password, stored_hashed_password):
        raise HTTPException(
            status_code=401, 
            detail="Invalid credentials."
        )
    
    # Replace this placeholder with create_access_token link once you activate PyJWT utilities
    return {"status": "success", "session_token": "jwt_token_example"}