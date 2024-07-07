import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DiagnosisChart from './DiagnosisChart';
import { getStudentDiagnoses, deleteDiagnosis } from '../../services/api.js';

const ShowStudentDiagnosis = ({ studentId }) => {
    const [diagnoses, setDiagnoses] = useState([]);

    const fetchDiagnoses = async () => {
        try {
            const response = await getStudentDiagnoses(studentId);
            if (response.data[0]) {
                setDiagnoses(response.data);
            } else {
                toast.info('לא נמצאו דיאגנוזות');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('לא נמצאו דיאגנוזות');
            } else {
                toast.error('בעיה בהצגת הדיאגנוזה');
            }
        }
    };

    useEffect(() => {
        fetchDiagnoses();
    }, [studentId]);

    const deleteCurrentDiagnosis = async (diagnosisId) => {
        try {
            const response = await deleteDiagnosis(diagnosisId);
            if (response.status === 200) {
                setDiagnoses(diagnoses.filter(diagnosis => diagnosis._id !== diagnosisId));
                toast.success('הדיאגנוזה נמחקה בהצלחה');
            } else {
                toast.error('שגיאה במחיקה');
            }
        } catch (error) {
            toast.error('שגיאה במחיקת הדיאגנוזה');
        }
    };

    const handleDelete = (diagnosisId) => {
        if (confirm('Are you sure you want to delete?'))
            deleteCurrentDiagnosis(diagnosisId);
    };

    return (
        <div>
            {diagnoses.length > 0 ? (
                <> <br />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        {diagnoses.map(diagnosis => (
                            <div key={diagnosis._id} style={{ marginBottom: '70px', textAlign: 'center' }}>
                                <button
                                    onClick={() => handleDelete(diagnosis._id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px 20px',
                                        backgroundColor: '#ff4d4f',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    <br />
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '10px' }} />מחק דיאגנוזה </button>
                                <DiagnosisChart diagnosisData={diagnosis} />
                                <br />
                            </div>
                        ))}
                    </div></>
            ) : (
                <p>לא נמצאו דיאגנוזות זמינות</p>
            )}
        </div>
    );
};

export default ShowStudentDiagnosis;
