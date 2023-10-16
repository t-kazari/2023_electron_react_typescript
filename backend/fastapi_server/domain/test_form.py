from pydantic import BaseModel
from typing import List


class TestForm(BaseModel):
    id: int
    name: str
    gender: str

class InputTestForm(BaseModel):
    id: int
    name: str
    gender: str


class OutputCommon(BaseModel):
    statusCode: str = None
    message: str = None


class OutputTestForm(OutputCommon):
    responseEntity: List[TestForm] = None
