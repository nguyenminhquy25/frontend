import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components'

const ChartStyled = styled.div`
  width: 300px;
  height: 300px;

`

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPieChart = () => {
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const taskList = [
    {
      priority: "LOW"
    },
    {
      priority: "MEDIUM"
    },
    {
      priority: "HIGH"
    },
    {
      priority: "LOW"
    },
    {
      priority: "LOW"
    },
    {
      priority: "HIGH"
    },
    {
      priority: "MEDIUM"
    },
    {
      priority: "MEDIUM"
    },
    {
      priority: "HIGH"
    },
    {
      priority: "LOW"
    },
    {
      priority: "HIGH"
    },
    {
      priority: "HIGH"
    },
    {
      priority: "LOW"
    },
    {
      priority: "LOW"
    },
    {
      priority: "LOW"
    },
    {
      priority: "LOW"
    },
    {
      priority: "LOW"
    },
    {
      priority: "MEDIUM"
    }
  ]

  const labels = Array.from(new Set(taskList.map(task => task.priority)));

  const dataSetting = {
    labels,
    datasets: [{
      label: '# of Votes',
      data: labels.map(label => taskList.filter(task => task.priority === label).length),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }]
  }

  return <ChartStyled> 
    <Pie data={dataSetting} />
  </ChartStyled>
}

export default TaskPieChart