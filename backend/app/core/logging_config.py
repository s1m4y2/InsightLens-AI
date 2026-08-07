import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)


def setup_logging():

    formatter = logging.Formatter(

        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"

    )

    app_handler = RotatingFileHandler(

        LOG_DIR / "app.log",

        maxBytes=10 * 1024 * 1024,

        backupCount=5,

        encoding="utf-8"

    )

    app_handler.setFormatter(formatter)

    error_handler = RotatingFileHandler(

        LOG_DIR / "error.log",

        maxBytes=10 * 1024 * 1024,

        backupCount=5,

        encoding="utf-8"

    )
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(formatter)

    ai_handler = RotatingFileHandler(

        LOG_DIR / "ai.log",

        maxBytes=10 * 1024 * 1024,

        backupCount=5,

        encoding="utf-8"

    )
    ai_handler.setFormatter(formatter)
    ai_logger = logging.getLogger("ai")

    ai_logger.addHandler(ai_handler)

    ai_logger.setLevel(logging.INFO)
    ai_logger = logging.getLogger("ai")
    ai_logger.setLevel(logging.INFO)
    ai_logger.handlers.clear()       # aynı handler iki kez eklenmesin
    ai_logger.addHandler(ai_handler)
    ai_logger.propagate = False      # app.log'a tekrar düşmesini engeller

    # ROOT LOGGER
    root_logger = logging.getLogger()
    root_logger.handlers.clear()     # uvicorn reload'da duplicate log oluşmasın
    root_logger.setLevel(logging.INFO)

    root_logger.addHandler(app_handler)
    root_logger.addHandler(error_handler)
    root_logger.addHandler(logging.StreamHandler())
    

    

    

    

    logging.basicConfig(

        level=logging.INFO,

        handlers=[

            app_handler,

            error_handler,

            logging.StreamHandler()

        ]

    )