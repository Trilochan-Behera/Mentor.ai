from fastapi import FastAPI, HTTPException, Depends
from schemas import SignupRequest, VerifyOTPRequest
from database import get_db, get_redis
import random
import smtplib
from email.mime.text import MIMEText

app = FastAPI(title="LOGIC.ai Identity Service")

def send_otp_email(email: str, otp: str):
    # Brevo/SMTP Configuration
    msg = MIMEText(f"Your LOGIC.ai verification code is: {otp}")
    msg['Subject'] = "Verify Your Sovereign Identity"
    msg['From'] = "auth@logic.ai"
    msg['To'] = email

    # Uncomment and fill for production email sending
    # with smtplib.SMTP("smtp-relay.brevo.com", 587) as server:
    #     server.starttls()
    #     server.login("your_user", "your_pass")
    #     server.send_message(msg)
    print(f"DEBUG: Sent OTP {otp} to {email}")

@app.post("/auth/signup")
async def signup(payload: SignupRequest, redis=Depends(get_redis)):
    # 1. Generate 6-digit OTP
    otp = str(random.randint(100000, 999999))
    
    # 2. Store OTP and Password temporarily in Redis (5 min expiry)
    redis.setex(f"otp:{payload.email}", 300, otp)
    redis.setex(f"temp_pwd:{payload.email}", 300, payload.password)
    
    # 3. Trigger Email
    send_otp_email(payload.email, otp)
    
    return {"status": "success", "message": "OTP sent to email"}

@app.post("/auth/verify")
async def verify(payload: VerifyOTPRequest, db=Depends(get_db), redis=Depends(get_redis)):
    # 1. Validate OTP
    stored_otp = redis.get(f"otp:{payload.email}")
    if not stored_otp or stored_otp != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # 2. Retrieve Password and Create Permanent Profile
    password = redis.get(f"temp_pwd:{payload.email}")
    
    try:
        user_data = db.table("profiles").insert({
            "email": payload.email,
            "password": password,  # Use hashing (bcrypt) in production
            "is_verified": True,
            "rank_title": "Novice"
        }).execute()
        
        # 3. Cleanup Redis
        redis.delete(f"otp:{payload.email}")
        redis.delete(f"temp_pwd:{payload.email}")
        
        return {"status": "authorized", "user": user_data.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/login")
async def login(payload: SignupRequest, db=Depends(get_db)):
    user = db.table("profiles").select("*").eq("email", payload.email).execute()
    
    if not user.data or user.data[0]['password'] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"status": "success", "session_token": "jwt_token_example"}