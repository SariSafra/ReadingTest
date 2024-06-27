import React, { useEffect, useState } from 'react';
import { getStudentDiagnoses } from '../../services/api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteDiagnosis from './DeleteDiagnosis';
import DiagnosisChart from './DiagnosisChart';

const ShowStudentDiagnosis = ({ studentId }) => {
      
    const [diagnosis, setDiagnosis] = useState( {
        ExeNum: 1,
        Diagnosis: {
          frequencyMap: {
            correct: 10,
            incorrect: 2,
            swaps: [
              {
                output: "a",
                times: 3
              },
              {
                output: "c",
                times: 1
              }
            ]
          },
          successRate: 83.33,
          time: "15:30"
        },
        Mediation: {
          Emphasis: true,
          Repeat: false
        }
      });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchDiagnosis = async () => {
        try {
            // const response = await getStudentDiagnoses(studentId);
            // if (response.data) {
            //     setDiagnosis(response.data);
            // } else {
            //     toast.info('No diagnosis found for this student.');
            // }
            console.log("change this part")
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
