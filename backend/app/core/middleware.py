import time

from starlette.middleware.base import BaseHTTPMiddleware


class RequestTimerMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request,
        call_next
    ):

        start = time.perf_counter()

        response = await call_next(request)

        duration = round(
            (time.perf_counter() - start) * 1000,
            2
        )

        response.headers["X-Response-Time"] = f"{duration} ms"

        return response