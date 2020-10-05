"""populate taxonomic groups

Revision ID: 28b02bdd09da
Revises: 7d74892e5dca
Create Date: 2020-10-04 17:07:18.131455

"""
from alembic import op
import sqlalchemy as sa
import os
import csv

# revision identifiers, used by Alembic.
revision = '28b02bdd09da'
down_revision = '7d74892e5dca'
branch_labels = None
depends_on = None

def insert_taxnomic_group(group, presence, in_top_30):
    is_present = presence == 'Present'
    is_in_top_30 = in_top_30 == 'true'
    op.execute(f"INSERT INTO taxonomic_groups (group_name, presence, top30) VALUES ('{group}', {is_present}, {is_in_top_30})")

def upgrade():
    data_file = os.path.join(os.path.dirname(__file__), '..', '..', 'processed', 'aav8391_Data_S2.csv')
    assert os.path.exists(data_file), f"CSV file not found: {data_file}"
    with open(data_file, 'r') as csvfile:
        reader = csv.reader(csvfile)
        next(reader) # skip header

        for row in reader:
            insert_taxnomic_group(row[0], row[1], row[2])

def downgrade():
    op.execute("DELETE FROM taxonomic_groups")
