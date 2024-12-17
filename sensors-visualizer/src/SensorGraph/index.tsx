import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_ENDPOINT = "http://localhost:8000/api/sensors"

const SensorGraph = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/average?period=24h`)
      .then(response => {
        setSensorData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Sensor Averages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sensorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="average" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SensorGraph;