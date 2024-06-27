import React, { useEffect, useState } from 'react';
import { getStudentDiagnoses, deleteDiagnosis } from '../../services/api'; 

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

    const handleDelete = async (diagnosisId) => {
        try {
            await deleteDiagnosis(diagnosisId);
            setDiagnoses(diagnoses.filter(diagnosis => diagnosis._id !== diagnosisId));
        } catch (error) {
            console.error("Error deleting diagnosis", error);
        }
    };

    return (
        <div>
            <h3>Diagnoses for Student {studentId}</h3>
            <ul>
                {diagnoses.map((diagnosis) => (
                    <li key={diagnosis._id}>
                        {diagnosis.detail}
                        <button onClick={() => handleDelete(diagnosis._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowStudentDiagnosis;
