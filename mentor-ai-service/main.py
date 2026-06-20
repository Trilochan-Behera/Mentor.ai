from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.auth.router import router as auth_router
from services.eval.router import router as eval_router
from services.practice.router import router as practice_router

app = FastAPI(title="Mentor.ai Scalable Unified Platform Node")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route prefixes cleanly under a single port (8000)
app.include_router(auth_router)
app.include_router(eval_router)
app.include_router(practice_router)