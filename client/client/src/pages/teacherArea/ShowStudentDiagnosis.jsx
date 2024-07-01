import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteDiagnosis from './DeleteDiagnosis';
import DiagnosisChart from './DiagnosisChart';
import {getStudentDiagnoses} from '../../services/api.js'

const ShowStudentDiagnosis = ({ studentId }) => {
    const [diagnosis, setDiagnosis] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchDiagnosis = async () => {
        try {
            // Fetch the diagnosis data here
             const response = await getStudentDiagnoses(studentId);
            if (response.data) {
                setDiagnosis(response.data);
            } else {
                toast.info('No diagnosis found for this student.');
            }

            // // For demonstration purposes, using a mock diagnosis
            // const mockDiagnosis = {
            //     frequencyMap: {
            //         "input1": {
            //             correct: 10,
            //             incorrect: 2,
            //             swaps: [
            //                 { output: "a", times: 3 },
            //                 { output: "c", times: 1 }
            //             ]
            //         },
            //         "input2": {
            //             correct: 8,
            //             incorrect: 3,
            //             swaps: [
            //                 { output: "b", times: 2 },
            //                 { output: "d", times: 1 }
            //             ]
            //         }
            //     },
            //     toEmphasis: true,
            //     toRepeat: false,
            //     successRate: "83.33",
            //     time: "15:30",
            //     consistentSwappingPercentage: {
            //         "input1": "50.00",
            //         "input2": "33.33"
            //     }
            // };
            
            //setDiagnosis(mockDiagnosis);
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
                    <DiagnosisChart diagnosisData={diagnosis} />
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
