from app.entities.ai_log_entity import AILogEntity


class AILogMapper:

    def to_entity(
        self,
        module,
        version,
        provider,
        prompt,
        response,
        execution_time_ms,
    ):

        return AILogEntity(

            module=module,

            version=version,

            provider=provider,

            prompt=prompt,

            response=response,

            execution_time_ms=execution_time_ms

        )