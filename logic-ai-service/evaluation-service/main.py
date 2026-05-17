import os
import uuid
import time
import random
from pydantic import BaseModel, Field, EmailStr
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from schemas import AssessmentPayload
from ai_engine import generate_cognitive_profile

app = FastAPI(title="LOGIC.ai Optimized Unified Evaluation Service Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
)

@app.get("/evaluation/questions")
async def get_assessment_questions(topics: str = Query(...), db=Depends(get_db)):
    # Start timer trace
    start_time = time.time()
    print("\n" + "⏱️ " * 30)
    print("🚀 [PERFORMANCE TRACE] FETCHING RANDOM QUESTIONS FROM CLOUD DB")
    
    try:
        topic_ids = [t.strip() for t in topics.split(",") if t.strip()]
        if not topic_ids:
            raise HTTPException(status_code=400, detail="At least one valid topic code parameter is required.")
            
        sample_size = 5 if len(topic_ids) == 1 else 7 if len(topic_ids) == 2 else 10
        
        # Execute the optimized index-scanning RPC function
        res = db.rpc("get_random_questions", {"target_topics": topic_ids, "sample_size": sample_size}).execute()
        
        # Log elapsed execution time
        elapsed_time = round((time.time() - start_time) * 1000, 2)
        print(f"✅ [PERFORMANCE SUCCESS] DB Handshake completed in {elapsed_time}ms!")
        print("⏱️ " * 30 + "\n")
        
        if not res.data:
            raise HTTPException(status_code=404, detail="No matching questions found.")
            
        return {"status": "success", "questions": res.data}
    except Exception as e:
        print(f"💥 [PERFORMANCE FAILURE] Crash after {round((time.time() - start_time) * 1000, 2)}ms -> {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluation/analyze")
async def analyze_assessment_results(payload: AssessmentPayload, db=Depends(get_db)):
    total_questions = len(payload.attempts)
    if total_questions == 0:
        raise HTTPException(status_code=400, detail="Cannot execute profiling evaluations on empty logs array.")

    # 1. READ EXISTING LIFETIME STATE RUN SEQUENCES
    try:
        global_res = db.table("user_global_metrics").select("*").eq("user_email", payload.email).execute()
        has_history = len(global_res.data) > 0
        
        if payload.topic_id == "evolution_baseline":
            next_attempt_no = 1
            previous_success = 0.00
            total_past_sessions = 0
            total_past_questions = 0
            # Guardrail to protect baseline overwrite
            if has_history and global_res.data[0]["total_attempts"] > 0:
                next_attempt_no = global_res.data[0]["current_attempt_no"] + 1
        else:
            if has_history:
                past_global = global_res.data[0]
                next_attempt_no = max(2, past_global.get("current_attempt_no", 0) + 1)
                previous_success = past_global.get("current_attempt_success_percentage", 0.00)
                total_past_sessions = past_global.get("total_attempts", 0)
                total_past_questions = past_global.get("total_attempted_questions", 0)
            else:
                next_attempt_no = 2
                previous_success = 0.00
                total_past_sessions = 0
                total_past_questions = 0
    except Exception:
        next_attempt_no = 2
        previous_success = 0.00
        total_past_sessions = 0
        total_past_questions = 0
        has_history = False

    # 2. RUN PERFORMANCE SEPARATIONS
    metrics = {"correct": 0, "wrong": 0, "skipped": 0, "correct_but_slow": 0, "guesses": 0}
    session_attempt_id = str(uuid.uuid4())
    history_records = []

    for attempt in payload.attempts:
        if attempt.selected_option == -1:
            status = "skipped"
            metrics["skipped"] += 1
        elif attempt.time_taken_seconds <= 2:
            status = "guess"
            metrics["guesses"] += 1
            if attempt.is_correct: metrics["correct"] += 1
            else: metrics["wrong"] += 1
        elif attempt.is_correct and attempt.time_taken_seconds > 35:
            status = "correct_but_slow"
            metrics["correct_but_slow"] += 1
            metrics["correct"] += 1
        elif attempt.is_correct:
            status = "correct"
            metrics["correct"] += 1
        else:
            status = "wrong"
            metrics["wrong"] += 1

        history_records.append({
            "attempt_id": session_attempt_id,
            "attempt_no": next_attempt_no,
            "user_email": payload.email,
            "question_id": attempt.question_id,
            "topic_id": payload.topic_id,
            "sub_topic": attempt.sub_topic,
            "status": status,
            "time_taken_seconds": attempt.time_taken_seconds
        })

    accuracy_percentage = round((metrics["correct"] / total_questions) * 100, 2)

    try:
        # DB WRITE A: Insert master test session scorecard row
        db.table("test_sessions").insert({
            "attempt_id": session_attempt_id,
            "user_email": payload.email,
            "topic_id": payload.topic_id,
            "attempt_no": next_attempt_no,
            "accuracy_percentage": accuracy_percentage,
            "total_time_seconds": payload.total_time_seconds
        }).execute()

        # DB WRITE B: Bulk upsert metrics rows to tracking logs
        db.table("user_question_history").upsert(history_records, on_conflict="user_email,question_id").execute()

        # DB WRITE C: Synchronize lifetime aggregates (Preserving previous columns intact)
        if has_history:
            past = global_res.data[0]
            global_payload = {
                "user_email": payload.email,
                "total_attempts": past.get("total_attempts", 0) + 1,
                "total_correct": past.get("total_correct", 0) + metrics["correct"],
                "total_wrong": past.get("total_wrong", 0) + metrics["wrong"],
                "total_skipped": past.get("total_skipped", 0) + metrics["skipped"],
                "total_correct_but_slow": past.get("total_correct_but_slow", 0) + metrics["correct_but_slow"],
                "total_guesses": past.get("total_guesses", 0) + metrics["guesses"],
                "total_attempted_questions": past.get("total_attempted_questions", 0) + total_questions,
                "current_attempt_no": next_attempt_no,
                "current_attempt_success_percentage": accuracy_percentage,
                "last_success_percentage": previous_success,
                "updated_at": "now()"
            }
        else:
            global_payload = {
                "user_email": payload.email,
                "total_attempts": 1,
                "total_correct": metrics["correct"],
                "total_wrong": metrics["wrong"],
                "total_skipped": metrics["skipped"],
                "total_correct_but_slow": metrics["correct_but_slow"],
                "total_guesses": metrics["guesses"],
                "total_attempted_questions": total_questions,
                "current_attempt_no": next_attempt_no,
                "current_attempt_success_percentage": accuracy_percentage,
                "last_success_percentage": 0.00
            }
        db.table("user_global_metrics").upsert(global_payload).execute()
    except Exception as db_err:
        print(f"💥 [DATABASE UPDATE FAULT]: {str(db_err)}")

    ai_insights = generate_cognitive_profile(payload.topic_id, accuracy_percentage, payload.total_time_seconds, total_questions, metrics)

    return {
        "status": "evaluated",
        "attempt_id": session_attempt_id,
        "attempt_no": next_attempt_no,
        "scoreCard": {
            "total": total_questions,
            "correct": metrics["correct"],
            "wrong": metrics["wrong"],
            "skipped": metrics["skipped"],
            "accuracy": accuracy_percentage,
            "last_accuracy": previous_success,
            "timeSpentSeconds": payload.total_time_seconds,
            "breakdown": metrics
        },
        "aiInsights": ai_insights
    }

@app.get("/evaluation/progress-history")
async def get_user_progress_timeline(email: str = Query(...), db=Depends(get_db)):
    try:
        res = db.table("test_sessions").select("attempt_no", "accuracy_percentage", "total_time_seconds", "created_at").eq("user_email", email).order("attempt_no", ascending=True).execute()
        return {"status": "success", "history": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/practice/generate-set")
async def generate_unique_practice_set(email: str = Query(...), topic_id: str = Query(...), count: int = 10, db=Depends(get_db)):
    try:
        history_res = db.table("user_question_history").select("question_id").eq("user_email", email).execute()
        seen_ids = [row["question_id"] for row in history_res.data] if history_res.data else []
        query = db.table("questions").select("*").eq("topic_id", topic_id)
        if seen_ids:
            query = query.not_.in_("id", seen_ids)
        res = query.execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="All available questions inside this category completed!")
        sample_size = min(count, len(res.data))
        return {"status": "success", "questions": random.sample(res.data, sample_size)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)