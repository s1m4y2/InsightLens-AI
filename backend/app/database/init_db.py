from app.database.database import Base
from app.database.database import engine

from app.entities.review_analysis_entity import (
    ReviewAnalysisEntity,
)

Base.metadata.create_all(engine)

print("Database initialized.")