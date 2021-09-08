import React from 'react'
import { Line } from 'react-chartjs-2'
import { observer } from 'mobx-react'
import { useStore } from 'stores'

const LineChart = observer(() => {
  const { wheatherStore } = useStore()
  const { randonTemp } = wheatherStore

  const data = {
    labels: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    datasets: [
      {
        label: 'Temp by Time',
        data: [...randonTemp],
        fill: false,
        backgroundColor: '#5B8CFF',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        circular: true,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Line data={data} options={options} width={150} height={80} />
    </>
  )
})

export default LineChart
