import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteDiagnosis } from '../../services/api';

// Set app element for accessibility (for react-modal)
Modal.setAppElement('#root');

const DeleteDiagnosis = ({ isOpen, onRequestClose, diagnosisId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            const response = await deleteDiagnosis(diagnosisId);
            if (response.status === 200) {
                onDeleteSuccess();
                toast.success('Diagnosis deleted successfully.');
            } else {
                toast.error('Error deleting diagnosis.');
            }
        } catch (error) {
            toast.error('Error deleting diagnosis.');
        } finally {
            onRequestClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Confirmation"
        >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this diagnosis?</p>
            <button onClick={handleDelete}>Yes, delete it</button>
            <button onClick={onRequestClose}>Cancel</button>
        </Modal>
    );
};

export default DeleteDiagnosis;
