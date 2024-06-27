import React, { useEffect, useState } from 'react';
import { getStudentDiagnoses } from '../../services/api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteDiagnosis from './DeleteDiagnosis';

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
    };

    return (
        <div>
            <h3>Diagnosis for Student {studentId}</h3>
            {diagnosis ? (
                <div>
                    <p>{diagnosis.detail}</p>
                    <button onClick={openModal}>Delete</button>
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
