from pydantic import BaseModel
from typing import List


class TestForm(BaseModel):
    id: int
    name: str
    gender: str

class InputTestForm(BaseModel):
    param1: str
    param2: str


class OutputCommon(BaseModel):
    statusCode: str = None
    message: str = None


class OutputTestForm(OutputCommon):
    responseEntity: List[TestForm] = None
