from logging import getLogger
from typing import List

from databases import Database
from injector import inject, singleton
import sqlalchemy

from domain.test_form import InputTestForm, TestForm
from repository.test_form_repository import TestFormRepository

metadata = sqlalchemy.MetaData()
logger = getLogger(__name__)

formdata = sqlalchemy.Table(
    'formdata',
    metadata,
    sqlalchemy.Column('id', sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column('name', sqlalchemy.String(length=10)),
    sqlalchemy.Column('gender', sqlalchemy.String(length=10))
)


@singleton
class TestFormImpl(TestFormRepository):

    @inject
    def __init__(self, repository: Database) -> None:
        self.__repository = repository
        logger.info('create TestFormImpl')
        
    async def create_form_data(self, input: InputTestForm) -> None:
        logger.info('start create_form_data')
        
        query = formdata.insert().values(id=input.id, name=input.name, gender=input.gender)
        await self.__repository.execute(query)
        
        logger.info('end create_form_data')
        

    async def find_form_data(self) -> List[TestForm]:
        logger.info('start find_form_data')
                
        query = formdata.select()
        columns = [formdata.c.id, formdata.c.name, formdata.c.gender]
        query = query.with_only_columns(columns)
        result = await self.__repository.fetch_all(query)
        logger.info('end find_form_data')
        return result
