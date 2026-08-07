import logging

logger = logging.getLogger("ai")


def log_ai_request(
    provider: str,
    model: str,
    duration: float
):

    logger.info(

        "%s | %s | %.2f ms",

        provider,

        model,

        duration

    )