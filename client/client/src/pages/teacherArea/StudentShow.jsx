import React, { useState } from "react";
import { delStudent } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Typography, List, ListItem, Paper, IconButton, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowStudentDiagnosis from "./ShowStudentDiagnosis";
import { useNavigate } from "react-router-dom";

const StudentShow = ( { student, studentsArr, setStudentsArr ,setToShowStudent }) => {


    const handleStudentDelete = async (studentId) => {
        const id = prompt("For deletion enter the student ID", "");
        if (id === studentId) {
            try {
                await delStudent(studentId);
                setToShowStudent(false);
                setStudentsArr(studentsArr.filter(student => student.studentId !== studentId));
            } catch (error) {
                toast.error("Failed to delete student");
            }
        }
    };

    return (
        <>
            <Box style={{ flex: 1 }}>
                <Typography variant="h6">{student.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">ID: {student.studentId}</Typography>
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



// import React, { useState } from "react";
// import { delStudent } from "../../services/api";
// import { ToastContainer, toast } from 'react-toastify';
// import { Container, Typography, List, ListItem, Paper, IconButton, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShowStudentDiagnosis from "./ShowStudentDiagnosis";

// const StudentShow = ({ student, studentsArr, setStudentsArr }) => {
//     const [toShowDiagnosis, setToShowDiagnosis] = useState(false);

//     const handleStudentDelete = async (studentId) => {
//         const id = prompt("For deletion enter the student ID", "");
//         if (id === studentId) {
//             try {
//                 await delStudent(studentId);
//                 setStudentsArr(studentsArr.filter(student => student.studentId !== studentId));
//                 toast.success("Student deleted successfully");
//             } catch (error) {
//                 toast.error("Failed to delete student");
//             }
//         }
//     };

//     const handleCloseDiagnosis = () => {
//         setToShowDiagnosis(false);
//     };

//     return (
//         <ListItem>
//             <Paper elevation={3} style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Box style={{ flex: 1 }}>
//                     <Typography variant="h6">{student.name}</Typography>
//                     <Typography variant="subtitle1" color="textSecondary">ID: {student.studentId}</Typography>
//                 </Box>
//                 <Box style={{ display: 'flex', alignItems: 'center' }}>
//                     <Button variant="contained" color="primary" onClick={() => setToShowDiagnosis(true)} style={{ marginLeft: '10px' }}>
//                         Show Diagnosis
//                     </Button>
//                     <IconButton edge="end" aria-label="delete" onClick={() => handleStudentDelete(student.studentId)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Box>
//             </Paper>
//             <Dialog open={toShowDiagnosis} onClose={handleCloseDiagnosis} fullWidth maxWidth="md">
//                 <DialogTitle>Diagnosis for Student</DialogTitle>
//                 <DialogContent>
//                     <ShowStudentDiagnosis studentId={student._id} />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDiagnosis} color="primary">Close</Button>
//                 </DialogActions>
//             </Dialog>
//             <ToastContainer />
//         </ListItem>
//     );
// };

// export default StudentShow;
