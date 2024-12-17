from pydantic import BaseModel
from datetime import datetime


class SensorData(BaseModel):
    equipmentId: str
    timestamp: datetime
    value: float
