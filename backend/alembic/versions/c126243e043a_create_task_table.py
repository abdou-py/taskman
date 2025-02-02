"""Create task table

Revision ID: c126243e043a
Revises: 828712e38242
Create Date: 2025-02-02 08:45:13.894255

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql 


# revision identifiers, used by Alembic.
revision: str = 'c126243e043a'
down_revision: Union[str, None] = '828712e38242'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table('task',
        sa.Column('idtask', sa.Integer(), primary_key=True, autoincrement=True),  # Corrected
        sa.Column('title', sa.String(length=45), nullable=False), # Corrected
        sa.Column('description', sa.String(255), nullable=True),
        sa.Column('is_completed', sa.Boolean(), server_default='0', nullable=True) # Corrected
    )

def downgrade():
    op.drop_table('task') 
