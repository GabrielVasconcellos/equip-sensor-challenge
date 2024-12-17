from datetime import datetime, timedelta
import random
import requests

API_URL = "http://localhost:8000/api/sensors"


def populate_database():
    try:
        start_time = datetime.now() - timedelta(days=2)
        end_time = datetime.now()

        equipment_ids = [f"EQ-{i}" for i in range(1001, 1021)]
        data = []
        current_time = start_time
        while current_time <= end_time:
            for id in equipment_ids:
                data.append(
                    {
                        "equipmentId": id,
                        "timestamp": current_time.isoformat(),
                        "value": round(random.uniform(0, 100), 2),
                    }
                )
            current_time += timedelta(minutes=20)

        for d in data:
            requests.post(API_URL, json=d)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    populate_database()
