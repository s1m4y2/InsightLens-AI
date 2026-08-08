"""add notifications

Revision ID: 8aaf9121ee31
Revises: f43220b17370
Create Date: 2026-08-08 15:38:41.430029

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.

revision: str = "8aaf9121ee31"

down_revision: Union[str, Sequence[str], None] = "f43220b17370"

branch_labels: Union[str, Sequence[str], None] = None

depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.create_table(

        "notifications",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "title",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "description",
            sa.Text(),
            nullable=False
        ),

        sa.Column(
            "type",
            sa.String(length=50),
            nullable=False
        ),

        sa.Column(
            "is_read",
            sa.Boolean(),
            nullable=False
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True
        ),

        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"]
        ),

        sa.PrimaryKeyConstraint(
            "id"
        )
    )

    op.create_index(
        "ix_notifications_user_id",
        "notifications",
        ["user_id"],
        unique=False
    )


def downgrade() -> None:

    op.drop_table(
        "notifications"
    )