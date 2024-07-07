import React, { useState } from "react";
import { delStudent } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Typography, List, ListItem, Paper, IconButton, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowStudentDiagnosis from "./ShowStudentDiagnosis";
import { useNavigate } from "react-router-dom";

const StudentShow = ( { student, studentsArr, setStudentsArr ,setToShowStudent }) => {


    const handleStudentDelete = async (studentId) => {
        const id = prompt("למחיקה-אכנס תעודת זהות של התלמיד", "");
        if (id === studentId) {
            try {
                await delStudent(studentId);
                setToShowStudent(false);
                setStudentsArr(studentsArr.filter(student => student.studentId !== studentId));
            } catch (error) {
                toast.error("מחיקת הדיאגנוזה נכשלה");
            }
        }
    };

    return (
        <>
            <Box style={{ flex: 1 }}>
                <Typography variant="h6">{student.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary"> תעודת זהות: {student.studentId}</Typography>
                <IconButton edge="end" aria-label="delete" onClick={() => handleStudentDelete(student.studentId)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box style={{ flex: 1 }}>
                <ShowStudentDiagnosis studentId={student._id} />
            </Box>
        </>
    );
};

export default StudentShow;

