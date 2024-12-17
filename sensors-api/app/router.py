from fastapi import HTTPException, UploadFile, APIRouter
from datetime import datetime, timedelta
from pandas import read_csv

from app.models import SensorData
from app.db import sensor_collection

router = APIRouter(prefix="/api")


@router.post("/sensors")
async def register_sensor_data(data: SensorData):
    try:
        document = {
            "equipmentId": data.equipmentId,
            "timestamp": data.timestamp,
            "value": data.value,
        }
        sensor_collection.insert_one(document)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/sensors:upload-csv")
async def upload_csv(file: UploadFile):
    try:
        df = read_csv(file.file)
        documents = []
        for _, row in df.iterrows():
            document = {
                "equipmentId": row["equipmentId"],
                "timestamp": datetime.fromisoformat(row["timestamp"]),
                "value": row["value"],
            }
            documents.append(document)
        if documents:
            sensor_collection.insert_many(documents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/sensors/average")
async def get_sensors_averages(period: str):
    try:
        if period not in ["24h", "48h", "1w", "1m"]:
            raise HTTPException(status_code=400, detail="Invalid period parameter")

        now = datetime.now()
        if period == "24h":
            start_time = now - timedelta(hours=24)
        elif period == "48h":
            start_time = now - timedelta(hours=48)
        elif period == "1w":
            start_time = now - timedelta(weeks=1)
        elif period == "1m":
            start_time = now - timedelta(days=30)

        pipeline = [
            {"$match": {"timestamp": {"$gte": start_time}}},
            {"$group": {"_id": "$equipmentId", "average": {"$avg": "$value"}}},
        ]

        results = sensor_collection.aggregate(pipeline)
        averages = {result["_id"]: round(result["average"], 2) for result in results}
        return averages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
