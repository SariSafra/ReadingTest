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
                toast.success('הדיאגנוזה נמחקה בהצלחה');
            } else {
                toast.error('שגיאה במחיקת הבעיה');
            }
        } catch (error) {
            toast.error('שגיאה במחיקת הדיאגנוזה');
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
            <h2>אימות מחיקה</h2>
            <p>אתה בטוח שאתה רוצה למחוק את הדיאגנוזה?</p>
            <button onClick={handleDelete}>כן, מחק</button>
            <button onClick={onRequestClose}>ביטול</button>
        </Modal>
    );
};

export default DeleteDiagnosis;
