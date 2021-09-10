import React from 'react'
import { Line } from 'react-chartjs-2'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)

const LineChart = observer(() => {
  const { wheatherStore } = useStore()
  const { randonTemp } = wheatherStore

  const data = {
    labels: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    datasets: [
      {
        label: 'Temp by Time',
        data: [...randonTemp],
        fill: true,
        backgroundColor: '#5B8CFF',
        pointStyle: 'line',
        borderRadius: 7,

        datalabels: {
          color: '#918f8f',
          anchor: 'start',
          align: 'top',
          offset: 0,
          font: {
            size: 8,
            lineHeight: 1.2,
          },
        },
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    bezierCurve: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 2,
      },
    },
    scales: {
      yAxes: {
        display: false,
        position: 'right',
        color: '#5B8CFF',
        title: {
          align: 'top',
          color: '#C5C5C5',
        },
        ticks: {
          beginAtZero: true,
          color: '#C5C5C5',
          font: {
            size: 12,
            lineHeight: 1.2,
          },
        },
        grid: {
          color: 'transparent',
          borderWidth: 'transparent',
        },
      },
      xAxes: {
        display: true,
        ticks: {
          beginAtZero: true,
          color: '#C5C5C5',
          font: {
            size: 10,
            lineHeight: 1.2,
          },
        },
        grid: {
          color: 'transparent',
          borderWidth: 'transparent',
        },
      },
    },
  }

  return (
    <>
      <Line data={data} options={options} width={150} height={80} />
    </>
  )
})

export default LineChart
