# EQUIP-SENSOR-CHALLENGE
This repository is divided in two main parts: `sensors-api` and `sensors-visualizer`

## sensors-api
API for registering data from sensors on a database.

### How to run
#### Requirements
- Python
- Poetry
- Docker

In order to start the API, you must run the steps below:
```bash
cd sensors-api 

docker-compose up -d

poetry install
poetry run fastapi dev
```

Now the database is up and the API ready to receive requests. There is a complete documentation for each endpoint at `/docs`.