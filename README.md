# EQUIP-SENSOR-CHALLENGE
This repository is divided in two main parts: `sensors-api` and `sensors-visualizer`

## sensors-api

An API that allows you to store data from sensors in a database using **FastAPI**.

### Requirements

Before running the API, ensure you have the following installed:

- **Python**
- **Poetry**
- **Docker**

### How to run

1. **Navigate to the project directory**:
```bash
cd sensors-api
```

2. **Start the database using Docker**:
```bash
docker-compose up -d
```

3. **Install project dependencies using Poetry**:
```bash
poetry install
```

4. **Run the FastAPI server**:
```bash
poetry run fastapi dev
```

At this point, the database is running, and the API is ready to receive requests.

### API Documentation

A complete set of API documentation is available at the /docs endpoint. You can access it by navigating to:

http://localhost:8000/docs


## sensor-visualizer

A React application to display sensor averages as a line graph with selectable time periods (`24h`, `48h`, `1w`, `1m`) using **Recharts**.

### Requirements
- **Node.js**
- **npm**

### How to run
1. **Navigate to the project directory**:
```bash
cd sensors-visualizer
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Access the app**: <br/>
Open your browser and go to:
http://localhost:5173


### Usage
- **Select a Time Period**: <br/>
Use the buttons at the top to switch between 24h, 48h, 1w, and 1m.

- **View the Graph**: <br/>
The line chart will display the average sensor values for the selected period.