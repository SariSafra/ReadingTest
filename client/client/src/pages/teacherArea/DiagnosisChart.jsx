import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DiagnosisChart = ({ diagnosisData }) => {
    const frequencyMapData = {
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: 'Frequency Map',
                data: [
                    diagnosisData.Diagnosis.frequencyMap.correct,
                    diagnosisData.Diagnosis.frequencyMap.incorrect
                ],
                backgroundColor: ['green', 'red'],
            },
        ],
    };

    const swapsData = {
        labels: diagnosisData.Diagnosis.frequencyMap.swaps.map(swap => swap.output),
        datasets: [
            {
                label: 'Swaps',
                data: diagnosisData.Diagnosis.frequencyMap.swaps.map(swap => swap.times),
                backgroundColor: 'blue',
            },
        ],
    };

    const successRateAndTimeData = {
        labels: ['Success Rate', 'Time'],
        datasets: [
            {
                label: 'Success Rate and Time',
                data: [diagnosisData.Diagnosis.successRate, parseFloat(diagnosisData.Diagnosis.time)],
                backgroundColor: ['purple', 'orange'],
            },
        ],
    };

    return (
        <div>
            <h3>Frequency Map</h3>
            <Bar data={frequencyMapData} />
            <h3>Swaps</h3>
            <Bar data={swapsData} />
            <h3>Success Rate and Time</h3>
            <Bar data={successRateAndTimeData} />
        </div>
    );
};

export default DiagnosisChart;
