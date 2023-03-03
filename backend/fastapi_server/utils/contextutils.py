from starlette.requests import Request


def get_context(request: Request):
    return request.state.context
