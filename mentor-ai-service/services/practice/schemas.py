from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import date

class PracticeSetupPayload(BaseModel):
    email: EmailStr
    sub_topic: str
    question_count: int = Field(10, gte=5, lte=30)  # Limits sets between 5 and 30 questions
    difficulty_level: int = Field(2, gte=1, lte=3)  # 1 = Easy, 2 = Medium, 3 = Hard


class TimetableSetupPayload(BaseModel):
    email: EmailStr
    start_date: date
    end_date: date
    selected_topics: List[str]  # e.g., ["1", "2", "3"] for Quant, Logic, Verbal
    difficulty_preference: str  # "basic", "medium", "hard", "mix"