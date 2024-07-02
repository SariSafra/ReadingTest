import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faClock } from '@fortawesome/free-solid-svg-icons';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DiagnosisChart = ({ diagnosisData }) => {
    if (!diagnosisData) {
        return <p>No data available.</p>;
    }

    const { frequencyMap, toEmphasis, toRepeat, successRate, time, consistentSwappingPercentage } = diagnosisData;

    if (!frequencyMap || Object.keys(frequencyMap).length === 0) {
        return <p>No frequency map data available.</p>;
    }

    // Prepare data for the input-specific chart
    const labels = Object.keys(frequencyMap);
    const correctData = labels.map(key => frequencyMap[key]?.correct || 0);
    const incorrectData = labels.map(key => frequencyMap[key]?.incorrect || 0);
    const inputChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Correct',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: correctData
            },
            {
                label: 'Incorrect',
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.6)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: incorrectData
            }
        ]
    };

    // Prepare data for the consistent swapping percentage pie chart
    const consistentSwappingSum = labels.reduce((sum, key) => sum + parseFloat(consistentSwappingPercentage?.[key] || 0), 0);
    const inconsistentSwappingSum = 100 - consistentSwappingSum;

    const pieChartData = {
        labels: ['Consistent Swapping', 'Inconsistent Swapping'],
        datasets: [
            {
                data: [consistentSwappingSum, inconsistentSwappingSum],
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)'],
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            }
        ]
    };

    // Prepare data for the success rate pie chart
    const successRateValue = parseFloat(successRate || 0);
    const successRateChartData = {
        labels: ['Success Rate', 'Failure Rate'],
        datasets: [
            {
                data: [successRateValue, 100 - successRateValue],
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)'],
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            }
        ]
    };

    return (
        <div>
            <h4>Diagnosis Chart</h4>
            <Bar data={inputChartData} />
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <p>Emphasis</p>
                    <FontAwesomeIcon icon={toEmphasis ? faCheck : faTimes} size="2x" color={toEmphasis ? 'green' : 'red'} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p>Repeat</p>
                    <FontAwesomeIcon icon={toRepeat ? faCheck : faTimes} size="2x" color={toRepeat ? 'green' : 'red'} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p>Average Time</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faClock} size="2x" color="blue" style={{ marginRight: '10px' }} />
                        <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{time}</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '200px', height: '200px' }}>
                    <h5>Consistent Swapping Percentage</h5>
                    <Pie data={pieChartData} />
                </div>
                <div style={{ width: '200px', height: '200px' }}>
                    <h5>Success Rate</h5>
                    <Pie data={successRateChartData} />
                </div>
            </div>
        </div>
    );
};

export default DiagnosisChart;
