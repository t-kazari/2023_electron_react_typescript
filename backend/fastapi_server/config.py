import json
from logging import basicConfig, DEBUG
import os

import databases
import sqlalchemy

import domain.constants as constants
import secret as secret

DOCS_DISP = 'OFF'

formatter = '%(levelname)s : %(name)s : %(filename)s : %(lineno)d : %(message)s'
basicConfig(level=DEBUG, format=formatter)

DATABASE = 'sqlite'



#DATABASE_URL = f'{DATABASE}://{USER}:{PASSWORD}@{HOST}/{DB_NAME}'
DATABASE_URL = secret.SQLITE_LOCAL_PATH
database = databases.Database(DATABASE_URL)
ECHO_LOG = False
engine = sqlalchemy.create_engine(DATABASE_URL, echo=ECHO_LOG)
metadata = sqlalchemy.MetaData()
