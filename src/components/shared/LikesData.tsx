import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

const LikesChart: React.FC<any> = (likesData) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Fetch data and update chart
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulated data for likes
    likesData = likesData.data;
    // Register category scale
    Chart.register(CategoryScale, BarController, BarElement);
    Chart.register(LinearScale, BarController, BarElement);

    // Update chart data
    setChartData({
      labels: ['Total Likes', 'Women Likes', 'Men Likes'],
      datasets: [
        {
          label: 'Likes',
          data: [likesData.totalLikes, likesData.womenLikes, likesData.menLikes],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        },
      ],
    });
  };

  return (
    <div>
      <h2>Likes Chart</h2>
      {chartData && <Bar data={chartData} options={{ responsive: true }} />}
    </div>
  );
};

export default LikesChart;