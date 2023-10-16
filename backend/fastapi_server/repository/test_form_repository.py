from typing import List

from abc import ABCMeta, abstractmethod
from domain.test_form import InputTestForm, TestForm


class TestFormRepository(metaclass=ABCMeta):

    @abstractmethod
    async def create_form_data(self, input: InputTestForm) -> None:
        pass

    @abstractmethod
    async def find_form_data(self) -> List[TestForm]:
        pass
