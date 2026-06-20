import uuid
import time
import random
from fastapi import APIRouter, Depends, HTTPException, Query
from config.database import get_supabase_db

from .schemas import AssessmentPayload
from .ai_engine import generate_cognitive_profile
from .repository import EvaluationRepository

router = APIRouter(prefix="/eval", tags=["Decoupled Evaluation Engine"])

@router.get("/questions")
async def get_assessment_questions(topics: str = Query(...), db=Depends(get_supabase_db)):
    start_time = time.time()
    repo = EvaluationRepository(db)
    try:
        topic_ids = [t.strip() for t in topics.split(",") if t.strip()]
        if not topic_ids:
            raise HTTPException(status_code=400, detail="At least one valid topic code parameter is required.")
            
        sample_size = 5 if len(topic_ids) == 1 else 7 if len(topic_ids) == 2 else 10
        res = repo.get_random_questions_rpc(topic_ids, sample_size)
        
        if not res.data:
            raise HTTPException(status_code=404, detail="No matching questions found.")
            
        return {"status": "success", "questions": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze")
async def analyze_assessment_results(payload: AssessmentPayload, db=Depends(get_supabase_db)):
    total_questions = len(payload.attempts)
    if total_questions == 0:
        raise HTTPException(status_code=400, detail="Cannot execute profiling evaluations on empty logs array.")

    repo = EvaluationRepository(db)
    global_metrics = {"correct": 0, "wrong": 0, "skipped": 0, "correct_but_slow": 0, "guesses": 0}
    topic_breakdown = {}
    
    session_attempt_id = str(uuid.uuid4())
    history_records = []

    try:
        global_res = repo.get_global_metrics(payload.email)
        has_history = len(global_res.data) > 0
        
        if payload.topic_id == "evolution_baseline":
            next_attempt_no = 1
            previous_success = 0.00
            if has_history and global_res.data[0]["total_attempts"] > 0:
                next_attempt_no = global_res.data[0]["current_attempt_no"] + 1
        else:
            if has_history:
                past_global = global_res.data[0]
                next_attempt_no = max(2, past_global.get("current_attempt_no", 0) + 1)
                previous_success = past_global.get("current_attempt_success_percentage", 0.00)
            else:
                next_attempt_no = 2
                previous_success = 0.00
    except Exception:
        next_attempt_no = 2
        previous_success = 0.00
        has_history = False

    for attempt in payload.attempts:
        try:
            q_meta = repo.get_question_topic_id(attempt.question_id)
            actual_topic_id = q_meta.data[0]["topic_id"] if q_meta.data else "1"
        except Exception:
            actual_topic_id = "1"

        if actual_topic_id not in topic_breakdown:
            topic_breakdown[actual_topic_id] = {"correct": 0, "total": 0}
        
        topic_breakdown[actual_topic_id]["total"] += 1

        if attempt.selected_option == -1:
            status = "skipped"
            global_metrics["skipped"] += 1
        elif attempt.time_taken_seconds <= 2:
            status = "guess"
            global_metrics["guesses"] += 1
            if attempt.is_correct:
                global_metrics["correct"] += 1
                topic_breakdown[actual_topic_id]["correct"] += 1
            else:
                global_metrics["wrong"] += 1
        elif attempt.is_correct and attempt.time_taken_seconds > 35:
            status = "correct_but_slow"
            global_metrics["correct_but_slow"] += 1
            global_metrics["correct"] += 1
            topic_breakdown[actual_topic_id]["correct"] += 1
        elif attempt.is_correct:
            status = "correct"
            global_metrics["correct"] += 1
            topic_breakdown[actual_topic_id]["correct"] += 1
        else:
            status = "wrong"
            global_metrics["wrong"] += 1

        history_records.append({
            "attempt_id": session_attempt_id,
            "attempt_no": next_attempt_no,
            "user_email": payload.email,
            "question_id": attempt.question_id,
            "topic_id": actual_topic_id,
            "sub_topic": attempt.sub_topic,
            "status": status,
            "time_taken_seconds": attempt.time_taken_seconds
        })

    global_accuracy = round((global_metrics["correct"] / total_questions) * 100, 2)

    try:
        repo.insert_test_session({
            "attempt_id": session_attempt_id,
            "user_email": payload.email,
            "topic_id": payload.topic_id,
            "attempt_no": next_attempt_no,
            "accuracy_percentage": global_accuracy,
            "total_time_seconds": payload.total_time_seconds
        })

        repo.upsert_question_history(history_records)

        for topic_id, data in topic_breakdown.items():
            past_topic = repo.get_specific_topic_metric(payload.email, topic_id)
            
            if past_topic.data:
                old_total = past_topic.data[0].get("total_attempted_questions", 0)
                old_correct = past_topic.data[0].get("total_correct", 0)
                new_total = old_total + data["total"]
                new_correct = old_correct + data["correct"]
                
                repo.upsert_topic_metrics({
                    "user_email": payload.email,
                    "topic_id": topic_id,
                    "total_attempted_questions": new_total,
                    "total_correct": new_correct,
                    "accuracy_percentage": round((new_correct / new_total) * 100, 2),
                    "updated_at": "now()"
                })
            else:
                repo.insert_topic_metrics({
                    "user_email": payload.email,
                    "topic_id": topic_id,
                    "total_attempted_questions": data["total"],
                    "total_correct": data["correct"],
                    "accuracy_percentage": round((data["correct"] / data["total"]) * 100, 2)
                })

        if has_history:
            past = global_res.data[0]
            global_payload = {
                "user_email": payload.email,
                "total_attempts": past.get("total_attempts", 0) + 1,
                "total_correct": past.get("total_correct", 0) + global_metrics["correct"],
                "total_wrong": past.get("total_wrong", 0) + global_metrics["wrong"],
                "total_skipped": past.get("total_skipped", 0) + global_metrics["skipped"],
                "total_correct_but_slow": past.get("total_correct_but_slow", 0) + global_metrics["correct_but_slow"],
                "total_guesses": past.get("total_guesses", 0) + global_metrics["guesses"],
                "total_attempted_questions": past.get("total_attempted_questions", 0) + total_questions,
                "current_attempt_no": next_attempt_no,
                "current_attempt_success_percentage": global_accuracy,
                "last_success_percentage": previous_success,
                "updated_at": "now()"
            }
        else:
            global_payload = {
                "user_email": payload.email,
                "total_attempts": 1,
                "total_correct": global_metrics["correct"],
                "total_wrong": global_metrics["wrong"],
                "total_skipped": global_metrics["skipped"],
                "total_correct_but_slow": global_metrics["correct_but_slow"],
                "total_guesses": global_metrics["guesses"],
                "total_attempted_questions": total_questions,
                "current_attempt_no": next_attempt_no,
                "current_attempt_success_percentage": global_accuracy,
                "last_success_percentage": 0.00
            }
        repo.upsert_global_metrics(global_payload)
    except Exception as db_err:
        print(f"💥 [DATABASE MULTI-TOPIC TRANSACTION FAULT]: {str(db_err)}")

    ai_insights = generate_cognitive_profile(payload.topic_id, global_accuracy, payload.total_time_seconds, total_questions, global_metrics)

    return {
        "status": "evaluated",
        "attempt_id": session_attempt_id,
        "attempt_no": next_attempt_no,
        "scoreCard": {
            "total": total_questions,
            "correct": global_metrics["correct"],
            "accuracy": global_accuracy,
            "last_accuracy": previous_success,
            "timeSpentSeconds": payload.total_time_seconds,
            "breakdown": global_metrics,
            "individual_topics": topic_breakdown 
        },
        "aiInsights": ai_insights
    }


@router.get("/dashboard")
async def get_user_dashboard_server_driven_ui(email: str = Query(...), db=Depends(get_supabase_db)):
    repo = EvaluationRepository(db)
    try:
        global_res = repo.get_global_metrics(email)
        has_history = len(global_res.data) > 0
        
        if has_history:
            user_metrics = global_res.data[0]
            accuracy = float(user_metrics.get("current_attempt_success_percentage", 0))
            solved_count = user_metrics.get("total_attempted_questions", 0)
            drills_run = user_metrics.get("total_attempts", 0)
            
            mock_metrics = {
                "guesses": user_metrics.get("total_guesses", 0),
                "correct_but_slow": user_metrics.get("total_correct_but_slow", 0)
            }
            ai_profile = generate_cognitive_profile("1", accuracy, 60, 10, mock_metrics)
            ai_debrief_text = ai_profile["cognitive_profile"]
            ai_speed_rating = ai_profile["speed_rating"]
            rank_title = "Expert" if accuracy >= 80 else "Pro II" if accuracy >= 65 else "Pro I" if accuracy >= 45 else "Novice"
        else:
            accuracy = 0
            solved_count = 0
            drills_run = 0
            ai_debrief_text = "Onboarding baseline uncalibrated. Complete your Phase 1 Evolution test to activate tracking."
            ai_speed_rating = "Uncalibrated"
            rank_title = "Novice"

        topic_ledger = {"1": None, "2": None, "3": None}
        
        if has_history:
            topic_res = repo.get_topic_metrics(email)
            if topic_res.data:
                for row in topic_res.data:
                    topic_ledger[row["topic_id"]] = int(float(row["accuracy_percentage"]))

        master_subjects_blueprint = [
            {"id": "1", "title": "Quant", "sub_default": "Calculations", "color": "#10B981", "icon_default": "calculator"},
            {"id": "2", "title": "Logic", "sub_default": "Reasoning", "color": "#F59E0B", "icon_default": "git-branch"},
            {"id": "3", "title": "Verbal", "sub_default": "Language", "color": "#EF4444", "icon_default": "text"},
        ]

        dynamic_capability_parameters = []

        for subject in master_subjects_blueprint:
            score = topic_ledger[subject["id"]]
            if score is not None:
                dynamic_capability_parameters.append({
                    "title": subject["title"],
                    "sub": subject["sub_default"],
                    "perc": score,
                    "col": subject["color"],
                    "icon": subject["icon_default"],
                    "status_slug": "calibrated"
                })
            else:
                dynamic_capability_parameters.append({
                    "title": subject["title"],
                    "sub": "⚡ ATTEMPT DRILL",
                    "perc": 0,
                    "col": "#94A3B8",
                    "icon": "lock-closed",
                    "status_slug": "uncalibrated"
                })

        dynamic_capability_parameters.append({
            "title": "GS",
            "sub": "⚡ ATTEMPT DRILL",
            "perc": 0,
            "col": "#94A3B8",
            "icon": "lock-closed",
            "status_slug": "uncalibrated"
        })

        return {
          "status": "success",
          "ui_configuration": {
            "header": {
              "welcome_title": "Hello, Aspirant",
              "welcome_subtitle": "Let's smash today's goals.",
              "show_notification_dot": drills_run > 0
            },
            "status_badges": {
              "rank_label": f"Status: {rank_title}",
              "drill_sequence_label": f"Attempts: #{drills_run}"
            },
            "mastery_sphere": {
              "accuracy_percentage": round(accuracy),
              "solved_count_nodes": solved_count,
              "total_drills_nodes": drills_run
            },
            "performance_strip": {
              "speed_rating_string": ai_speed_rating,
              "tier_label": f"Rank: {rank_title}"
            },
            "next_mission_card": {
              "title": "NEXT STAGE PATH",
              "description": "Launch Phase 1 Evolution Drill" if drills_run == 0 else "Generate Unique Practice Matrix Set",
              "action_slug": "evolution_drill" if drills_run == 0 else "practice_dashboard"
            },
            "ai_debrief_module": {
              "title": "AI COGNITIVE DEBRIEF",
              "profile_text": ai_debrief_text,
              "stability_ratio": round(accuracy)
            },
            "capability_parameters": dynamic_capability_parameters,
            "exam_strategy_engine": [
              { "level": "Attempt First", "topics": "Reasoning, Syllogism", "color": "#10B981" },
              { "level": "Medium Priority", "topics": "Arithmetic, Grammar", "color": "#3B82F6" },
              { "level": "Careful Attempt", "topics": "Reading Comp, DI", "color": "#F59E0B" },
              { "level": "Last Priority", "topics": "Probability, Puzzles", "color": "#EF4444" } 
            ]
          }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))