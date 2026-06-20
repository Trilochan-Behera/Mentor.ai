from pydantic import BaseModel, Field, EmailStr

class PracticeSetupPayload(BaseModel):
    email: EmailStr
    sub_topic: str
    question_count: int = Field(10, gte=5, lte=30)  # Limits sets between 5 and 30 questions
    difficulty_level: int = Field(2, gte=1, lte=3)  # 1 = Easy, 2 = Medium, 3 = Hard