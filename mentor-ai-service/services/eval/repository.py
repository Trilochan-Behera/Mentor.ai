from supabase import Client

class EvaluationRepository:
    def __init__(self, db: Client):
        self.db = db

    def get_random_questions_rpc(self, topic_ids: list, sample_size: int):
        return self.db.rpc("get_random_questions", {"target_topics": topic_ids, "sample_size": sample_size}).execute()

    def get_global_metrics(self, email: str):
        return self.db.table("user_global_metrics").select("*").eq("user_email", email).execute()

    def get_topic_metrics(self, email: str):
        return self.db.table("user_topic_metrics").select("topic_id", "accuracy_percentage").eq("user_email", email).execute()

    def get_question_topic_id(self, question_id: str):
        return self.db.table("questions").select("topic_id").eq("id", question_id).execute()

    def insert_test_session(self, payload: dict):
        return self.db.table("test_sessions").insert(payload).execute()

    def upsert_question_history(self, records: list):
        return self.db.table("user_question_history").upsert(records, on_conflict="user_email,question_id").execute()

    def get_specific_topic_metric(self, email: str, topic_id: str):
        return self.db.table("user_topic_metrics").select("*").eq("user_email", email).eq("topic_id", topic_id).execute()

    def upsert_topic_metrics(self, payload: dict):
        return self.db.table("user_topic_metrics").upsert(payload, on_conflict="user_email,topic_id").execute()

    def insert_topic_metrics(self, payload: dict):
        return self.db.table("user_topic_metrics").insert(payload).execute()

    def upsert_global_metrics(self, payload: dict):
        return self.db.table("user_global_metrics").upsert(payload).execute()