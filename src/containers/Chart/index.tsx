import React, { useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

const ChartComponent = () => {
  const [chart, SetChartData] = useState()
  
  const chartData = {
    chartData: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{ label: 'temperature',
       data: [12, 19, 3, 5, 2, 3],
       backgroundColor: [
        'rgba(143, 26, 51, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
     }],
    },
  }
  return (
    <>
      <h2>Chart</h2>
      <div className="chartContainer">
        {/* <Bar
          data={chartData}
          width={50}
          height={50}
          options={{ maintainAspectRatio: false }}
        /> */}
      </div>
    </>
  )
}

export default ChartComponent
