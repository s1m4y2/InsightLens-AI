from sqlalchemy import desc
from sqlalchemy import select
from app.entities.review_analysis_entity import ReviewAnalysisEntity 
from sqlalchemy import or_
from sqlalchemy import func
import math
from sqlalchemy import func
from app.database.database import SessionLocal
from app.models.review import Review

class ReviewRepository:

    def save(self, entity):

        db = SessionLocal()

        try:

            db.add(entity)

            db.commit()

            db.refresh(entity)

        finally:

            db.close()

        return entity
    
    def exists_by_review_text(self, review_text: str) -> bool:

        db = SessionLocal()

        try:

            stmt = select(ReviewAnalysisEntity).where(
                ReviewAnalysisEntity.review_text == review_text
            )

            result = db.execute(stmt).scalar_one_or_none()

            return result is not None

        finally:

            db.close()

    def get_reviews(self,
        page: int = 1,
        page_size: int = 10,
        sentiment: str | None = None,
        emotion: str | None = None,
        search: str | None = None,
        category: str | None = None,
        keyword: str | None = None,
        sort: str = "id",
        order: str = "desc",
    ):
        allowed_sorts = (
            "id",
            "sentiment",
            "emotion",
            "created_at"
        )
        if sort not in allowed_sorts:
            sort = "id"

        sort_column = getattr(
            ReviewAnalysisEntity,
            sort
        )
        db = SessionLocal()
        query = select( ReviewAnalysisEntity)
        try:
            if sentiment:
                query = query.where(
                    ReviewAnalysisEntity.sentiment == sentiment
                )

            if emotion:
                query = query.where(
                    ReviewAnalysisEntity.emotion == emotion
                )

            if search:

                query = query.where(

                    or_(

                        ReviewAnalysisEntity.review_text.ilike(
                            f"%{search}%"
                        ),

                        ReviewAnalysisEntity.summary.ilike(
                            f"%{search}%"
                        )

                    )

                )

            if category:

                query = query.where(

                    ReviewAnalysisEntity.categories.ilike(
                        f"%{category}%"
                    )

                )

            if keyword:

                query = query.where(

                    ReviewAnalysisEntity.keywords.ilike(
                        f"%{keyword}%"
                    )

                )
            if order == "desc":

                query = query.order_by(
                    desc(sort_column)
                )

            else:

                query = query.order_by(
                    sort_column
                )

            # Toplam kayıt sayısı
            count_query = select(func.count()).select_from(ReviewAnalysisEntity)

            if sentiment:
                count_query = count_query.where(
                    ReviewAnalysisEntity.sentiment == sentiment
                )

            if emotion:
                count_query = count_query.where(
                    ReviewAnalysisEntity.emotion == emotion
                )

            if search:
                count_query = count_query.where(
                    or_(
                        ReviewAnalysisEntity.review_text.ilike(f"%{search}%"),
                        ReviewAnalysisEntity.summary.ilike(f"%{search}%"),
                    )
                )

            if category:
                count_query = count_query.where(
                    ReviewAnalysisEntity.categories.ilike(f"%{category}%")
                )

            if keyword:
                count_query = count_query.where(
                    ReviewAnalysisEntity.keywords.ilike(f"%{keyword}%")
                )

            total = db.scalar(count_query)

            reviews = db.scalars(
                query.offset((page - 1) * page_size).limit(page_size)
            ).all()
        finally:
            db.close()
        
        total_pages = max(
            1,
            math.ceil(total / page_size)
        )
        return {

            "total":total,

            "page":page,

            "page_size":page_size,

            "total_pages":total_pages,

            "has_next":page<total_pages,

            "has_previous":page>1,

            "items":reviews

        }
    


    def get_by_id(self, review_id: int):

        db = SessionLocal()

        try:

            return db.get(ReviewAnalysisEntity, review_id)

        finally:

            db.close()

    def count(self):

        db = SessionLocal()

        try:

            return db.query(
                ReviewAnalysisEntity
            ).count()

        finally:

            db.close()

    def count_by_sentiment(
        self,
        sentiment: str
    ):

        db = SessionLocal()

        try:

            return db.query(
                ReviewAnalysisEntity
            ).filter(
                ReviewAnalysisEntity.sentiment == sentiment
            ).count()

        finally:

            db.close()

    def latest(self, limit: int = 5):
        db = SessionLocal()
        try:

            reviews = (db.query(ReviewAnalysisEntity).order_by(ReviewAnalysisEntity.created_at.desc())
                .limit(limit)
                .all()
            )

            return [
                {
                    "id": review.id,
                    "review_text": review.review_text,
                    "summary": review.summary,
                    "sentiment": review.sentiment,
                    "emotion": review.emotion,
                    "created_at": review.created_at,
                }
                for review in reviews
            ]

        finally:
            db.close()
    def top_emotions(self):

        db = SessionLocal()

        try:
            rows = (
                db.query(
                    ReviewAnalysisEntity.emotion,
                    func.count().label("count")
                )
                .group_by(
                    ReviewAnalysisEntity.emotion
                )
                .order_by(
                    func.count().desc()
                )
                .limit(5)

                .all()

            )

            return [
                {
                    "label": emotion,
                    "count": count
                }
                for emotion, count in rows
            ]

        finally:

            db.close()

    def top_categories(self):

        db = SessionLocal()

        try:

            categories = {}

            reviews = db.query(
                ReviewAnalysisEntity
            ).all()

            for review in reviews:

                if not review.categories:
                    continue

                for category in review.categories:

                    category = category.strip()

                    categories[category] = (
                        categories.get(category, 0) + 1
                    )

            result = sorted(

                categories.items(),

                key=lambda x: x[1],

                reverse=True

            )[:5]

            return [
                {
                    "label": name,
                    "count": count
                }
                for name, count in result
            ]

        finally:

            db.close()

    def sentiment_distribution(self):

        db = SessionLocal()

        try:

            rows = (

                db.query(

                    ReviewAnalysisEntity.sentiment,

                    func.count().label("count")

                )

                .group_by(
                    ReviewAnalysisEntity.sentiment
                )

                .all()

            )

            return [

                {

                    "label": sentiment,

                    "count": count

                }

                for sentiment, count in rows

            ]

        finally:

            db.close()

    def emotion_distribution(self):

        db = SessionLocal()

        try:

            rows = (

                db.query(

                    ReviewAnalysisEntity.emotion,

                    func.count().label("count")

                )

                .group_by(
                    ReviewAnalysisEntity.emotion
                )

                .all()

            )

            return [

                {

                    "label": emotion,

                    "count": count

                }

                for emotion, count in rows

            ]

        finally:

            db.close()

    def category_distribution(self):

        db = SessionLocal()

        try:

            categories = {}

            reviews = db.query(
                ReviewAnalysisEntity
            ).all()

            for review in reviews:

                if not review.categories:
                    continue

                for category in review.categories:

                    category = category.strip()

                    categories[category] = (

                        categories.get(category, 0) + 1

                    )

            result = sorted(

                categories.items(),

                key=lambda x: x[1],

                reverse=True

            )

            return [

                {

                    "label": name,

                    "count": count

                }

                for name, count in result

            ]

        finally:

            db.close()

    def keyword_distribution(self):

        db = SessionLocal()

        try:

            keywords = {}

            reviews = db.query(
                ReviewAnalysisEntity
            ).all()

            for review in reviews:

                if not review.keywords:
                    continue

                for keyword in review.keywords:

                    keyword = keyword.strip()

                    keywords[keyword] = (

                        keywords.get(keyword, 0) + 1

                    )

            result = sorted(

                keywords.items(),

                key=lambda x: x[1],

                reverse=True

            )

            return [

                {

                    "label": name,

                    "count": count

                }

                for name, count in result

            ]

        finally:

            db.close()

    def average_review_length(self):

        db = SessionLocal()

        try:

            rows = db.query(
                ReviewAnalysisEntity.review_text
            ).all()

            if not rows:
                return 0

            total = sum(
                len(row.review_text)
                for row in rows
            )

            return round(
                total / len(rows),
                2
            )

        finally:

            db.close()

    def review_trend(self):

        db = SessionLocal()

        try:

            result = (

                db.query(

                    func.date(ReviewAnalysisEntity.created_at),

                    func.count(ReviewAnalysisEntity.id)

                )

                .group_by(

                    func.date(ReviewAnalysisEntity.created_at)

                )

                .order_by(

                    func.date(ReviewAnalysisEntity.created_at)

                )

                .all()

            )

            return [

                {

                    "date": str(date),

                    "count": count

                }

                for date, count in result

            ]

        finally:

            db.close()