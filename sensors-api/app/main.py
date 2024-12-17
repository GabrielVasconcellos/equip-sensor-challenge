from fastapi import FastAPI
from app.router import router

app = FastAPI(title="Equipment Sensor API")

app.include_router(router)