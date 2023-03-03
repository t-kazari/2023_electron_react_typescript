from typing import List

from abc import ABCMeta, abstractmethod
from pydantic import BaseModel

from domain.test_form import TestForm


class TestFormRepository(metaclass=ABCMeta):

    @abstractmethod
    async def find_form_data(self) -> List[TestForm]:
        pass
