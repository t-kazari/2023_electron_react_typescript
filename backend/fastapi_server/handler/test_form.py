import json
from logging import getLogger
import traceback

import decorator
from fastapi import APIRouter, Depends, Path, status
from fastapi.responses import JSONResponse
from injector import Injector

import domain.constants as constants
from domain.context import Context
from domain.test_form import InputTestForm, OutputTestForm
from injectormodule.di import TestFormModule
from repository.test_form_repository import TestFormRepository
from usecase.test_form_service import TestFormService
from utils.contextutils import get_context


router = APIRouter()
logger = getLogger(__name__)


@decorator.decorator
async def wrap(func, *args, **kwargs):
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except Exception as e:
            logger.error(f'error: {e}')
            traceback.print_exc()
            result = {'statusCode': constants.FATAL_STATUS,
                      'message': constants.FATAL_STATUS_MESSAGE}
            return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=result)
    result = await wrapper(*args, **kwargs)
    return result


@router.post('/fastapi/api/v1/alldata', response_model=OutputTestForm)
@wrap
async def find_all_data(context: Context = Depends(get_context)):
    logger.info('start find_form_data')
    injector = Injector([TestFormModule(context.db)])
    repo = injector.get(TestFormRepository)
    result = OutputTestForm()
    service = TestFormService(repo)
    response = await service.find_all_data()
    result.statusCode = constants.NORMAL_STATUS
    result.message = constants.NORMAL_STATUS_MESSAGE
    result.responseEntity = response
    
    logger.debug(response)
    
    logger.info('end find_form_data')
    return result


@router.post('/fastapi/api/v1/formdata', response_model=OutputTestForm)
@wrap
async def find_form_data(param: InputTestForm, context: Context = Depends(get_context)):
    logger.info('start find_form_data')
    injector = Injector([TestFormModule(context.db)])
    repo = injector.get(TestFormRepository)
    result = OutputTestForm()
    service = TestFormService(repo)
    response = await service.find_form_data(param)
    result.statusCode = constants.NORMAL_STATUS
    result.message = constants.NORMAL_STATUS_MESSAGE
    result.responseEntity = response
    
    logger.debug(response)
    
    logger.info('end find_form_data')
    return result
