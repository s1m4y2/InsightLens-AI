from app.repositories.ai_log_repository import AILogRepository


class AILogService:

    def __init__(self):

        self.repository = AILogRepository()

    def get_logs(self):

        return self.repository.get_all()

    def get_log(
        self,
        log_id: int
    ):

        return self.repository.get_by_id(log_id)