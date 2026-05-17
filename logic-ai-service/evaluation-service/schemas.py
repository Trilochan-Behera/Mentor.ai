from pydantic import BaseModel, Field, EmailStr
from typing import List

class AttemptDetail(BaseModel):
    question_id: str
    sub_topic: str
    selected_option: int                           # Valid option index (0 to 3) or -1 for explicit skips
    time_taken_seconds: int = Field(..., gte=0)    # Enforces non-negative values
    is_correct: bool

class AssessmentPayload(BaseModel):
    email: EmailStr                               # Validates syntax for user mapping
    topic_id: str                                 # Standardized category indicator code
    total_time_seconds: int = Field(..., gte=0)   # Global stopwatch execution tracking
    attempts: List[AttemptDetail]                 # Array mapping individual question metadata blocks