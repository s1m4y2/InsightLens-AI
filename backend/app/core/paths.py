from pathlib import Path

# backend/
BASE_DIR = Path(__file__).resolve().parents[2]

# backend/app/
APP_DIR = BASE_DIR / "app"

# backend/datasets/
DATASET_DIR = BASE_DIR / "datasets"

# backend/app/prompts/
PROMPTS_DIR = APP_DIR / "prompts"

# backend/app/exports/
EXPORT_DIR = APP_DIR / "exports"

# backend/logs/
LOG_DIR = BASE_DIR / "logs"

EXPORT_DIR.mkdir(exist_ok=True)
LOG_DIR.mkdir(exist_ok=True)