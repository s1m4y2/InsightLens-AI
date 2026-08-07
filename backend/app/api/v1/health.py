from fastapi import APIRouter
from sqlalchemy import text

from app.database.database import SessionLocal

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("")
def health():

    db = SessionLocal()

    try:

        db.execute(text("SELECT 1"))

        database = "UP"

    except:

        database = "DOWN"

    finally:

        db.close()

    return {

        "application": "UP",

        "database": database

    }