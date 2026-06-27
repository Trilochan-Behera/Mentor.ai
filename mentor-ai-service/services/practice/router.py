# services/practice/router.py
import random
from fastapi import APIRouter, Depends, HTTPException, Query
from config.database import get_supabase_db
from datetime import date, datetime, timedelta
from .schemas import TimetableSetupPayload
from .repository import PracticeRepository

# Append these endpoints to your existing practice router file

from .schemas import PracticeSetupPayload
from .repository import PracticeRepository

router = APIRouter(prefix="/practice", tags=["Decoupled Practice Laboratory"])

@router.get("/lab-configuration")
async def get_practice_lab_server_driven_ui(email: str = Query(...), db=Depends(get_supabase_db)):
    print(f"\n🧪 [PRACTICE LAB UI FETCH] Gathering adaptation arrays for: {email}")
    repo = PracticeRepository(db)
    try:
        global_res = repo.get_global_metrics(email)
        topic_res = repo.get_topic_metrics(email)
        
        has_history = len(global_res.data) > 0
        user_global = global_res.data[0] if has_history else {}
        
        topic_map = {row["topic_id"]: int(float(row["accuracy_percentage"])) for row in topic_res.data} if topic_res.data else {}
        topic_qs = {row["topic_id"]: row["total_attempted_questions"] for row in topic_res.data} if topic_res.data else {}

        avg_speed_lbl = "Calibrating..."
        accuracy_lbl = "Baseline Fixed"
        if has_history:
            total_slow = user_global.get("total_correct_but_slow", 0)
            total_guesses = user_global.get("total_guesses", 0)
            
            if total_slow > 5: avg_speed_lbl = f"Pacing Bottleneck: {total_slow} slow solves"
            if total_guesses > 5: accuracy_lbl = f"Alert: {total_guesses} guess items caught"

        dynamic_subjects = [
            {
                "id": "QA",
                "title": "Quantitative Aptitude",
                "subtitle": f"Solved: {topic_qs.get('1', 0)} Qs • Live Accuracy: {topic_map.get('1', 0)}%" if '1' in topic_map else "0% Completed • Uncalibrated Protocol",
                "icon": "calculator",
                "colors": ["#E8EAF6", "#C5CAE9"],
                "accent": "#3F51B5",
            },
            {
                "id": "Reasoning",
                "title": "Logical Reasoning",
                "subtitle": f"Solved: {topic_qs.get('2', 0)} Qs • Live Accuracy: {topic_map.get('2', 0)}%" if '2' in topic_map else "0% Completed • Uncalibrated Protocol",
                "icon": "bulb",
                "colors": ["#E1F5FE", "#B3E5FC"],
                "accent": "#0288D1",
            },
            {
                "id": "English",
                "title": "Verbal Ability",
                "subtitle": f"Solved: {topic_qs.get('3', 0)} Qs • Live Accuracy: {topic_map.get('3', 0)}%" if '3' in topic_map else "0% Completed • Uncalibrated Protocol",
                "icon": "book",
                "colors": ["#E8F5E9", "#C8E6C9"],
                "accent": "#388E3C",
            }
        ]

        return {
            "status": "success",
            "ui_lab_configuration": {
                "ai_recommendations": [
                    {
                        "title": "Weakness Attack",
                        "sub": "Targeting systemic failure points within sub-topic frameworks",
                        "icon": "skull-outline",
                        "color": "#EF4444",
                        "tag": "PRIORITY"
                    },
                    {
                        "title": "Smart Mix",
                        "sub": "Adaptive challenge variety tracking your core level matrix parameters",
                        "icon": "git-branch-outline",
                        "color": "#6366F1",
                        "tag": None
                    }
                ],
                "learning_adaptation_tiles": [
                    { "title": "Improve Speed", "icon": "flash-outline", "color": "#F59E0B", "sub": avg_speed_lbl },
                    { "title": "Improve Accuracy", "icon": "pulse-outline", "color": "#10B981", "sub": accuracy_lbl },
                    { "title": "Reduce Skips", "icon": "play-skip-forward-outline", "color": "#6366F1", "sub": "Track omission drops" },
                    { "title": "Revise Practice", "icon": "refresh-outline", "color": "#6ad3f6", "sub": "Review wrong histories" }
                ],
                "subjects": dynamic_subjects
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subtopics-configuration")
async def get_subtopics_selection_screen_metrics(email: str = Query(...), subject: str = Query(...), db=Depends(get_supabase_db)):
    repo = PracticeRepository(db)
    try:
        subject_id_map = {"QA": "1", "Reasoning": "2", "English": "3"}
        target_db_id = subject_id_map.get(subject, "1")

        history_res = repo.get_question_history_for_topic(email, target_db_id)

        sub_topic_ledger = {}
        default_pool = {
            "1": ["Time_and_Distance", "Averages", "Time_and_Work"],
            "2": ["Series_Progression", "Blood_Relations", "Circular_Seating"],
            "3": ["Antonyms", "Prepositions", "Reading_Comprehension"]
        }
        
        for name in default_pool.get(target_db_id, ["General Modules"]):
            sub_topic_ledger[name] = {"correct": 0, "total": 0}

        if history_res.data:
            for row in history_res.data:
                name = row["sub_topic"]
                if name not in sub_topic_ledger:
                    sub_topic_ledger[name] = {"correct": 0, "total": 0}
                
                sub_topic_ledger[name]["total"] += 1
                if row["status"] in ["correct", "correct_but_slow"]:
                    sub_topic_ledger[name]["correct"] += 1

        dynamic_subtopics_list = []
        for name, stats in sub_topic_ledger.items():
            total = stats["total"]
            acc = round((stats["correct"] / total) * 100) if total > 0 else 0
            
            status_tag = "STRENGTH" if acc >= 75 else "WEAKNESS" if (total > 0 and acc < 50) else "STABLE"
            trend_val = "+10" if status_tag == "STRENGTH" else "-4" if status_tag == "WEAKNESS" else "+2"

            dynamic_subtopics_list.append({
                "name": name.replace("_", " "),
                "accuracy": acc,
                "trend": trend_val,
                "solved": total,
                "status": status_tag
            })

        last_session = repo.get_last_test_session(email)

        if last_session.data:
            last_run = last_session.data[0]
            clean_date = last_run["created_at"].split("T")[0]
            last_recap = {
                "date": f"Recorded: {clean_date}",
                "correct": "Live", "wrong": "Logs", "skipped": "Sync",
                "accuracy": int(float(last_run["accuracy_percentage"])),
                "improvement": "+6%",
                "timeSpent": f"{round(last_run['total_time_seconds'] / 60, 1)} mins",
                "difficultyIssue": "Timer Velocity Pressure" if float(last_run["accuracy_percentage"]) < 60 else "Steady Progress"
            }
        else:
            last_recap = {
                "date": "No attempts logged yet.",
                "correct": 0, "wrong": 0, "skipped": 0, "accuracy": 0,
                "improvement": "+0%", "timeSpent": "0s", "difficultyIssue": "None"
            }

        return {
            "status": "success",
            "subtopics": dynamic_subtopics_list,
            "last_attempt_recap": last_recap
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-calibrated-set")
async def generate_calibrated_practice_set(payload: PracticeSetupPayload, db=Depends(get_supabase_db)):
    repo = PracticeRepository(db)
    try:
        history_res = repo.get_all_seen_question_ids(payload.email)
        seen_ids = [row["question_id"] for row in history_res.data] if history_res.data else []

        db_sub_topic_name = payload.sub_topic.replace(" ", "_")

        query = repo.fetch_questions_by_sub_topic(db_sub_topic_name, payload.difficulty_level)
        if seen_ids:
            query = query.not_.in_("id", seen_ids)
            
        res = query.execute()

        if not res.data:
            res = repo.fetch_questions_by_sub_topic(db_sub_topic_name, payload.difficulty_level).execute()

        if not res.data:
            raise HTTPException(status_code=404, detail="No question modules found matching this tier level.")

        sample_size = min(payload.question_count, len(res.data))
        selected_set = random.sample(res.data, sample_size)

        return {
            "status": "success",
            "questions": selected_set
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subtopic-recap")
async def get_subtopic_historical_recap(
    email: str = Query(...), 
    subject: str = Query(...), 
    sub_topic: str = Query(...), 
    db=Depends(get_supabase_db)
):
    print(f"\n📊 [RECAP ANALYZER] Compiling historical briefing panel for: {sub_topic}")
    repo = PracticeRepository(db)
    try:
        db_sub_topic_name = sub_topic.replace(" ", "_")
        subject_id_map = {"QA": "1", "Reasoning": "2", "English": "3"}
        target_db_id = subject_id_map.get(subject, "1")

        latest_attempt_query = repo.get_latest_sub_topic_attempt(email, target_db_id, db_sub_topic_name)

        if not latest_attempt_query.data:
            return {
                "status": "unattempted",
                "last_attempt": {
                    "date": "No historical attempts logged.",
                    "correct": 0, "wrong": 0, "skipped": 0, "accuracy": 0,
                    "improvement": "+0%", "timeSpent": "0s", "difficultyIssue": "Uncalibrated Module"
                }
            }

        target_attempt_id = latest_attempt_query.data[0]["attempt_id"]
        raw_timestamp = latest_attempt_query.data[0]["created_at"]

        session_items = repo.get_session_items_by_attempt(email, target_attempt_id, db_sub_topic_name)

        correct_count = 0
        wrong_count = 0
        skipped_count = 0
        total_seconds = 0

        for item in session_items.data:
            status = item["status"]
            total_seconds += item.get("time_taken_seconds", 0)

            if status in ["correct", "correct_but_slow"]:
                correct_count += 1
            elif status == "skipped":
                skipped_count += 1
            else:
                wrong_count += 1

        total_questions = len(session_items.data)
        accuracy_percentage = round((correct_count / total_questions) * 100) if total_questions > 0 else 0

        minutes = total_seconds // 60
        seconds = total_seconds % 60
        formatted_time = f"{minutes}m {seconds}s" if minutes > 0 else f"{seconds}s"

        pacing_issue = "Steady Pace"
        if total_questions > 0:
            avg_pacing = total_seconds / total_questions
            if avg_pacing > 45:
                pacing_issue = "High-Level Calculations / Complexity bottleneck"
            elif accuracy_percentage < 50 and avg_pacing < 15:
                pacing_issue = "Speed Trap: Rushing careless errors"

        clean_date_string = raw_timestamp.split("T")[0]

        return {
            "status": "success",
            "last_attempt": {
                "date": f"Attempt Date: {clean_date_string}",
                "correct": correct_count,
                "wrong": wrong_count,
                "skipped": skipped_count,
                "accuracy": accuracy_percentage,
                "improvement": "+5%" if accuracy_percentage >= 70 else "+2%", 
                "timeSpent": formatted_time,
                "difficultyIssue": pacing_issue
            }
        }
    except Exception as e:
        print(f"💥 Recap processing engine crash: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def compute_adaptive_schedule(total_days: int, topics: list, topic_metrics: list) -> list:
    """
    Allocates days across selected subjects inversely proportional to user accuracy.
    Lower accuracy metrics receive larger time buffers.
    """
    # Map user stats (default to 40% if no historical rows are logged)
    accuracy_map = {row["topic_id"]: float(row["accuracy_percentage"]) for row in topic_metrics}
    
    weights = {}
    total_weight = 0.0
    
    for t_id in topics:
        acc = accuracy_map.get(t_id, 40.0)
        # Inverse mapping: lower accuracy = higher weight distribution factor
        weight = max(10.0, 100.0 - acc) 
        weights[t_id] = weight
        total_weight += weight

    schedule_distribution = []
    allocated_days = 0
    
    for i, t_id in enumerate(topics):
        if i == len(topics) - 1:
            # Dump remainder days on the final element to avoid mathematical precision drop-offs
            days_for_topic = total_days - allocated_days
        else:
            days_for_topic = int((weights[t_id] / total_weight) * total_days)
            allocated_days += days_for_topic
        
        schedule_distribution.append({"topic_id": t_id, "days": max(1, days_for_topic)})
        
    return schedule_distribution

@router.post("/timetable/generate")
async def generate_user_adaptive_timetable(payload: TimetableSetupPayload, db=Depends(get_supabase_db)):
    repo = PracticeRepository(db)
    try:
        total_days = (payload.end_date - payload.start_date).days
        if total_days <= 0:
            raise HTTPException(status_code=400, detail="End date must fall after your designated start bounds.")

        # Gather real metric history to skew scheduling balances safely
        metrics_res = repo.get_topic_metrics(payload.email)
        allocations = compute_adaptive_schedule(total_days, payload.selected_topics, metrics_res.data)

        # Meta blueprint payload configuration tracking
        meta_payload = {
            "user_email": payload.email,
            "start_date": str(payload.start_date),
            "end_date": str(payload.end_date),
            "difficulty_preference": payload.difficulty_preference,
            "selected_topics": payload.selected_topics,
            "updated_at": "now()"
        }
        repo.save_timetable_meta(meta_payload)

        # Build day-by-day item maps
        day_records = []
        current_cursor_date = payload.start_date
        topic_titles = {"1": "Quantitative Aptitude", "2": "Logical Reasoning", "3": "Verbal Ability"}

        for item in allocations:
            for _ in range(item["days"]):
                if current_cursor_date > payload.end_date:
                    break
                day_records.append({
                    "user_email": payload.email,
                    "study_date": str(current_cursor_date),
                    "topic_id": item["topic_id"],
                    "topic_title": topic_titles.get(item["topic_id"], "General Core Studies"),
                    "is_completed": False
                })
                current_cursor_date += timedelta(days=1)

        repo.save_timetable_days_bulk(day_records)
        return {"status": "success", "total_days_allocated": total_days, "distribution_blueprint": allocations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/timetable/refresh")
async def sync_and_reallocate_timetable(email: str = Query(...), db=Depends(get_supabase_db)):
    """
    Recalibrates remaining timetable slots on the fly if milestones were missed.
    Folds past uncompleted tasks forward into the remaining date buffers.
    """
    repo = PracticeRepository(db)
    try:
        meta_res = repo.get_user_timetable_meta(email)
        if not meta_res.data:
            raise HTTPException(status_code=404, detail="No active timetable template map found for user record.")
        
        meta = meta_res.data[0]
        today_date = date.today()
        end_date = datetime.strptime(meta["end_date"], "%Y-%m-%d").date()
        
        remaining_days = (end_date - today_date).days
        if remaining_days <= 0:
            raise HTTPException(status_code=400, detail="The active schedule timeframe has passed. Please map a new timeline tracker.")

        metrics_res = repo.get_topic_metrics(email)
        allocations = compute_adaptive_schedule(remaining_days, meta["selected_topics"], metrics_res.data)

        day_records = []
        current_cursor_date = today_date
        topic_titles = {"1": "Quantitative Aptitude", "2": "Logical Reasoning", "3": "Verbal Ability"}

        for item in allocations:
            for _ in range(item["days"]):
                if current_cursor_date > end_date:
                    break
                day_records.append({
                    "user_email": email,
                    "study_date": str(current_cursor_date),
                    "topic_id": item["topic_id"],
                    "topic_title": topic_titles.get(item["topic_id"], "General Core Studies"),
                    "is_completed": False
                })
                current_cursor_date += timedelta(days=1)

        repo.save_timetable_days_bulk(day_records)
        return {"status": "success", "message": "Timeline adjustments balanced perfectly against your current performance metrics."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))