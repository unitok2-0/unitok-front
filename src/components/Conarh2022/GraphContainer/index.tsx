import moment from 'moment';
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

interface IGraphicProps {
  checkins?: any
}

export default function Graphic({checkins}: IGraphicProps) {

  function FilterSpliceHoursAndDates(dateAndHours) {
    return checkins?.filter(checkin => moment(checkin.moment).format('DD/MM/YYYY HH') === dateAndHours).length;
  }

  const date18And10h = FilterSpliceHoursAndDates('18/04/2022 10');
  const date18And11h = FilterSpliceHoursAndDates('18/04/2022 11');
  const date18And12h = FilterSpliceHoursAndDates('18/04/2022 12');
  const date18And13h = FilterSpliceHoursAndDates('18/04/2022 13');
  const date18And14h = FilterSpliceHoursAndDates('18/04/2022 14');
  const date18And15h = FilterSpliceHoursAndDates('18/04/2022 15');
  const date18And16h = FilterSpliceHoursAndDates('18/04/2022 16');
  const date18And17h = FilterSpliceHoursAndDates('18/04/2022 17');
  const date18And18h = FilterSpliceHoursAndDates('18/04/2022 18');
  const date18And19h = FilterSpliceHoursAndDates('18/04/2022 19');
  const date18And20h = FilterSpliceHoursAndDates('18/04/2022 20');

  const date19And10h = FilterSpliceHoursAndDates('19/04/2022 10');
  const date19And11h = FilterSpliceHoursAndDates('19/04/2022 11');
  const date19And12h = FilterSpliceHoursAndDates('19/04/2022 12');
  const date19And13h = FilterSpliceHoursAndDates('19/04/2022 13');
  const date19And14h = FilterSpliceHoursAndDates('19/04/2022 14');
  const date19And15h = FilterSpliceHoursAndDates('19/04/2022 15');
  const date19And16h = FilterSpliceHoursAndDates('19/04/2022 16');
  const date19And17h = FilterSpliceHoursAndDates('19/04/2022 17');
  const date19And18h = FilterSpliceHoursAndDates('19/04/2022 18');
  const date19And19h = FilterSpliceHoursAndDates('19/04/2022 19');
  const date19And20h = FilterSpliceHoursAndDates('19/04/2022 20');

  const date20And10h = FilterSpliceHoursAndDates('20/04/2022 10');
  const date20And11h = FilterSpliceHoursAndDates('20/04/2022 11');
  const date20And12h = FilterSpliceHoursAndDates('20/04/2022 12');
  const date20And13h = FilterSpliceHoursAndDates('20/04/2022 13');
  const date20And14h = FilterSpliceHoursAndDates('20/04/2022 14');
  const date20And15h = FilterSpliceHoursAndDates('20/04/2022 15');
  const date20And16h = FilterSpliceHoursAndDates('20/04/2022 16');
  const date20And17h = FilterSpliceHoursAndDates('20/04/2022 17');
  const date20And18h = FilterSpliceHoursAndDates('20/04/2022 18');
  const date20And19h = FilterSpliceHoursAndDates('20/04/2022 19');
  const date20And20h = FilterSpliceHoursAndDates('20/04/2022 20');

  return(
    <Line
      style={{ width: '100%', height: '100%' }}
      data={{
        labels: ['10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h'],
        datasets: [
          {
            label: 'Dia 1',
            data: [
              date18And10h, 
              date18And11h, 
              date18And12h, 
              date18And13h,
              date18And14h,
              date18And15h,
              date18And16h,
              date18And17h,
              date18And18h,
              date18And19h,
              date18And20h
            ],
            borderColor: '#FF4C1C',
            backgroundColor: '#FF4C1C',
            borderWidth: 3,
            tension: 0.4,
            pointStyle: 'circle'
          },
          {
            label: 'Dia 2',
            data: [
              date19And10h, 
              date19And11h, 
              date19And12h, 
              date19And13h,
              date19And14h,
              date19And15h,
              date19And16h,
              date19And17h,
              date19And18h,
              date19And19h,
              date19And20h
            ],
            borderColor: '#C6E8AB',
            backgroundColor: '#C6E8AB',
            borderWidth: 3,
            tension: 0.4,
          },
          {
            label: 'Dia 3',
            data: [
              date20And10h, 
              date20And11h, 
              date20And12h, 
              date20And13h,
              date20And14h,
              date20And15h,
              date20And16h,
              date20And17h,
              date20And18h,
              date20And19h,
              date20And20h
            ],
            borderColor: '#0B6442',
            backgroundColor: '#0B6442',
            borderWidth: 3,
            tension: 0.4,
          },
        ]
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