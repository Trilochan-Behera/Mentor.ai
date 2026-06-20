import random
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from config.database import get_supabase_db, get_redis_client
from .auth_utils import send_otp_email, hash_password, verify_password

from .schemas import SignupRequest, VerifyOTPRequest
from .repository import AuthRepository

router = APIRouter(prefix="/auth", tags=["Identity & Authentication Service"])

@router.post("/signup")
async def signup(
    payload: SignupRequest, 
    background_tasks: BackgroundTasks, 
    db = Depends(get_supabase_db), 
    redis = Depends(get_redis_client)
):
    repo = AuthRepository(db, redis)
    
    # 1. Existing database verification check via repository layer
    if repo.get_profile_by_email(payload.email):
        raise HTTPException(status_code=400, detail="You are already registered with this email.")

    otp = str(random.randint(100000, 999999))
    hashed_pwd = hash_password(payload.password)
    
    # 2. Store inside high-speed cache structures
    repo.store_temp_registration(payload.email, otp, hashed_pwd)
    
    # 3. Offload email generation worker threads to the background
    background_tasks.add_task(send_otp_email, payload.email, otp)
    
    return {"status": "success", "message": "OTP sent to email"}


@router.post("/verify")
async def verify(
    payload: VerifyOTPRequest, 
    db = Depends(get_supabase_db), 
    redis = Depends(get_redis_client)
):
    repo = AuthRepository(db, redis)
    
    # 1. Validate incoming dynamic token match parameters
    stored_otp = repo.get_otp(payload.email)
    if not stored_otp or stored_otp != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # 2. Concurrency Safety Check
    if repo.get_profile_by_email(payload.email):
        raise HTTPException(
            status_code=400, 
            detail="You are already registered with this email. Kindly login, not signup."
        )

    # 3. Recover temporary record payload structures
    hashed_password = repo.get_temp_pwd(payload.email)
    if not hashed_password:
        raise HTTPException(status_code=400, detail="Registration session expired. Please sign up again.")
    
    try:
        user_data = repo.create_profile(payload.email, hashed_password)
        repo.clear_temp_registration(payload.email)
        return {"status": "authorized", "user": user_data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
async def login(payload: SignupRequest, db = Depends(get_supabase_db)):
    repo = AuthRepository(db) # Login check operates entirely separate from memory cache resources
    user = repo.get_profile_by_email(payload.email)
    
    if not user:
        raise HTTPException(
            status_code=404, 
            detail="The email is not authorized. Kindly check your email or signup with this email for login."
        )
    
    stored_hashed_password = user[0]['password']
    if not verify_password(payload.password, stored_hashed_password):
        raise HTTPException(
            status_code=401, 
            detail="Invalid credentials."
        )
    
    return {"status": "success", "session_token": "jwt_token_example"}