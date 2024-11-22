import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, labels, maxDataPoints = 30 }) => {
  if (!data || !labels) {
    return <div>Loading...</div>; 
  }

  const limitedData = data.slice(-maxDataPoints);
  const limitedLabels = labels.slice(-maxDataPoints);

  const chartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Price History",
        data: limitedData,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", 
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}> 
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
