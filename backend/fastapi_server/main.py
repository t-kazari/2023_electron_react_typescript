from logging import getLogger

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from injector import Injector
from starlette.requests import Request

import config
from domain.context import Context
from handler.test_form import router as test_form_router


logger = getLogger(__name__)

app = FastAPI(
    docs_url='/docs' if config.DOCS_DISP == 'ON' else None,
    redoc_url='/docs' if config.DOCS_DISP == 'ON' else None,
)

logger.info('start')

app.include_router(test_form_router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
async def startup():
    await config.database.connect()
    logger.info('database connect')


@app.on_event('shutdown')
async def shutdown():
    await config.database.disconnect()
    logger.info('database disconnect')


@app.middleware('http')
async def db_session_middleware(request: Request, call_next):
    logger.info('start db_session_middleware')
    logger.info(f'host: {request.client.host}')
    if request.headers.get('X-Forwarded-For'):
        logger.info(f'X-Forwarded-For: {request.headers["X-Forwarded-For"]}')
    context = Context()
    context.db = config.database
    request.state.context = context

    response = await call_next(request)

    # ヘッダーに明示的にオリジンを設定する
    response.headers["Access-Control-Allow-Origin"] = origins[0]
    logger.info('end db_session_middleware')
    return response
