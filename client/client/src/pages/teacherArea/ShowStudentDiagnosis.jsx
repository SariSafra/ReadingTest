import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteDiagnosis from './DeleteDiagnosis';
import DiagnosisChart from './DiagnosisChart';
import { getStudentDiagnoses } from '../../services/api.js';

const ShowStudentDiagnosis = ({ studentId }) => {
    const [diagnosis, setDiagnosis] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchDiagnosis = async () => {
        try {
            const response = await getStudentDiagnoses(studentId);
            if (response.data) {
                setDiagnosis(response.data);
            } else {
                toast.info('No diagnosis found for this student.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('No diagnosis found for this student.');
            } else {
                toast.error('Error fetching diagnosis.');
            }
        }
    };

    useEffect(() => {
        fetchDiagnosis();
    }, [studentId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDeleteSuccess = () => {
        setDiagnosis(null);
        toast.success('Diagnosis deleted successfully.');
    };

    return (
        <div>
            <h3>Diagnosis for Student {studentId}</h3>
            {diagnosis ? (
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <button 
                        onClick={openModal} 
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
                            marginTop: '20px' 
                        }}
                    >
                       
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '10px' }} />
                        Delete Diagnosis
                    </button>
                    <DiagnosisChart diagnosisData={diagnosis} />

                </div>
            ) : (
                <p>No diagnosis available.</p>
            )}

            <ToastContainer />

            <DeleteDiagnosis
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                diagnosisId={diagnosis ? diagnosis._id : null}
                onDeleteSuccess={handleDeleteSuccess}
            />
        </div>
    );
};

export default ShowStudentDiagnosis;
