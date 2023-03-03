from logging import getLogger
from typing import List


from domain.test_form import InputTestForm, TestForm
from repository.test_form_repository import TestFormRepository

logger = getLogger(__name__)


class TestFormService:
    def __init__(self, repository: TestFormRepository) -> None:
        self.__repository = repository

    async def find_form_data(self, input: InputTestForm) -> List[TestForm]:
        logger.info('start find_form_data')
        result = await self.__repository.find_form_data()
        logger.info('end find_form_data')
        return result
