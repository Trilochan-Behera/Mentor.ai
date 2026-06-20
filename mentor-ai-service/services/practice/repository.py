from supabase import Client

class PracticeRepository:
    def __init__(self, db: Client):
        self.db = db

    def get_global_metrics(self, email: str):
        return self.db.table("user_global_metrics").select("*").eq("user_email", email).execute()

    def get_topic_metrics(self, email: str):
        return self.db.table("user_topic_metrics").select("*").eq("user_email", email).execute()

    def get_question_history_for_topic(self, email: str, topic_id: str):
        return self.db.table("user_question_history")\
                      .select("sub_topic", "status")\
                      .eq("user_email", email)\
                      .eq("topic_id", topic_id)\
                      .execute()

    def get_last_test_session(self, email: str):
        return self.db.table("test_sessions")\
                      .select("created_at", "accuracy_percentage", "total_time_seconds")\
                      .eq("user_email", email)\
                      .order("created_at", ascending=False)\
                      .limit(1)\
                      .execute()

    def get_all_seen_question_ids(self, email: str):
        return self.db.table("user_question_history").select("question_id").eq("user_email", email).execute()

    def fetch_questions_by_sub_topic(self, sub_topic: str, difficulty: int):
        return self.db.table("questions").select("*")\
                      .eq("sub_topic", sub_topic)\
                      .eq("difficulty_rating", difficulty)

    def get_latest_sub_topic_attempt(self, email: str, topic_id: str, sub_topic: str):
        return self.db.table("user_question_history")\
                      .select("attempt_id", "created_at")\
                      .eq("user_email", email)\
                      .eq("topic_id", topic_id)\
                      .eq("sub_topic", sub_topic)\
                      .order("created_at", ascending=False)\
                      .limit(1)\
                      .execute()

    def get_session_items_by_attempt(self, email: str, attempt_id: str, sub_topic: str):
        return self.db.table("user_question_history")\
                      .select("status", "time_taken_seconds")\
                      .eq("user_email", email)\
                      .eq("attempt_id", attempt_id)\
                      .eq("sub_topic", sub_topic)\
                      .execute()