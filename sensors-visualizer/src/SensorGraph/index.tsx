import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_ENDPOINT = "http://localhost:8000/api/sensors"

type SensorData = {
    name: string;
    value: number;
}[]

const availablePeriods = ["24h", "48h", "1w", "1m"]

const SensorGraph = () => {
    const [sensorData, setSensorData] = useState<SensorData>();
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState<string>(availablePeriods[0]);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}/average?period=${selectedPeriod}`, {
            headers: {
                'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET'
            }
        })
            .then(response => {
                const rawData = response.data;
                const transformedData = Object.keys(rawData).map((key) => ({
                    name: key,
                    value: rawData[key],
                }));
                setSensorData(transformedData);
            })
            .catch(error => {
                console.error('Error fetching sensor data:', error);
            })
            .finally(() => setLoading(false))
    }, [selectedPeriod]);

    return (
        <div>
            <h2>Sensor Averages</h2>
            <div style={{ marginBottom: "20px" }}>
                {availablePeriods.map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        style={{
                            margin: "0 10px",
                            padding: "10px 20px",
                            backgroundColor: selectedPeriod === period ? "#8884d8" : "#eee",
                            color: selectedPeriod === period ? "#fff" : "#333",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {period}
                    </button>
                ))}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ width: "100%", height: "500px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensorData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default SensorGraph;