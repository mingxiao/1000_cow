"""create taxonomic table

Revision ID: 7d74892e5dca
Revises:
Create Date: 2020-09-30 20:36:17.121778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7d74892e5dca'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'taxonomic_groups',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('group_name', sa.String(50), nullable=False),
        sa.Column('presence', sa.Boolean),
        sa.Column('inTop30', sa.Boolean),
    )

def downgrade():
    op.drop_table('taxonomic_groups')
