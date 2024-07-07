import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteDiagnosis from './DeleteDiagnosis';
import DiagnosisChart from './DiagnosisChart';
import { getStudentDiagnoses } from '../../services/api.js';

const ShowStudentDiagnosis = ({ studentId }) => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);

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

    const openModal = (diagnosisId) => {
        setSelectedDiagnosisId(diagnosisId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDiagnosisId(null);
    };

    const handleDeleteSuccess = (deletedDiagnosisId) => {
        setDiagnoses(diagnoses.filter(diagnosis => diagnosis._id !== deletedDiagnosisId));
        toast.success('הדיאגנוזה נמחקה בהצלחה');
    };

    return (
        <div>
            {diagnoses.length > 0 ? (
               <> <br/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {diagnoses.map(diagnosis => (
                        <div key={diagnosis._id} style={{ marginBottom: '70px', textAlign: 'center' }}>
                                                 <button 
                                onClick={() => openModal(diagnosis._id)} 
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
                                <br/>
                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: '10px' }} />מחק דיאגנוזה </button>
                            <DiagnosisChart diagnosisData={diagnosis} />
                           <br/>
                        </div>
                    ))}
                </div></>
            ) : (
                <p>לא נמצאו דיאגנוזות זמינות</p>
            )}


            <DeleteDiagnosis
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                diagnosisId={selectedDiagnosisId}
                onDeleteSuccess={handleDeleteSuccess}
            />
        </div>
    );
};

export default ShowStudentDiagnosis;
