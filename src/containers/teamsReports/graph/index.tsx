import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ITeamsReportsGraphProps {
  labels: string[];
  values: number[]
}

export default function TeamsReportsGraph({ labels, values }: ITeamsReportsGraphProps) {
  return (
    <Line 
      data={{
        labels,
        datasets: [{
          data: values,
          label: 'Leads',
          borderColor: '#FF4C1C',
          backgroundColor: '#FF4C1C',
          borderWidth: 3,
          tension: 0.4,
          pointStyle: 'circle'
        }]
      }}
      options={{
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#FCFCFC',
            bodyColor: '#6A736F',
            titleColor: '#6A736F',
            footerFont: {
              family: 'GT Maru, sans-serif',
            },
            titleFont: {
              family: 'GT Maru, sans-serif',
              weight: '300',
            },
            bodyFont: {
              family: 'GT Maru, sans-serif',
              weight: '300'
            },
            boxWidth: 7,
            boxHeight: 7,
            boxPadding: 8,
            bodySpacing: 11,
            padding: 16,
            usePointStyle: true,
          }
        },
      }}
    />
  )
}
