from pymongo import MongoClient

client = MongoClient("mongodb://root:password@localhost:27017")
db = client.sensors_db
sensor_collection = db.sensors
