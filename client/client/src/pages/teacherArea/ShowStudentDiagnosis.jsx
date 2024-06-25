import React, { useEffect, useState } from 'react';
import { getStudentDiagnoses } from '../../services/api'; 

const ShowStudentDiagnosis = ({ studentId }) => {
    const [diagnoses, setDiagnoses] = useState([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const response = await getStudentDiagnoses(studentId);
                setDiagnoses(response.data);
            } catch (error) {
                console.error("Error fetching diagnoses", error);
            }
        };

        fetchDiagnoses();
    }, [studentId]);

    return (
        <div>
            <h3>Diagnoses for Student {studentId}</h3>
            <ul>
                {diagnoses.map((diagnosis) => (
                    <li key={diagnosis.id}>{diagnosis.detail}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowStudentDiagnosis;
