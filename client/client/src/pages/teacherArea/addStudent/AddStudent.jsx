import React, { useState } from "react";
import { createStudent, sendEmail } from '../../../services/api';
import { Box, Typography, TextField, Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import AddStudentForm from './AddStudentForm';
import { ModalContent, modalStyle, Message } from '../../style/addStudent.js';

const AddStudent = ({ studentsArr, setStudentsArr, fetchStudents }) => {
    const [inputsValue, setInputsValue] = useState({ name: '', password: '', id: '', profile: null, profileImageUrl: 'http://localhost:3000/profile-image/profile.png' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputsValue.name);
        formData.append('id', inputsValue.id);
        formData.append('password', inputsValue.password);
        if (inputsValue.profile) {
            formData.append('file', inputsValue.profile);
        }

        try {
            const savedStudent = await createStudent(formData);
            setStudentDetails(savedStudent.data);
            setSuccessMessage("Student added successfully!");
            setErrorMessage('');
            setModalIsOpen(true);
            //setStudentsArr([...studentsArr, savedStudent.data]);
            fetchStudents();
        } catch (error) {
            if (error.response?.status === 400) {
                setErrorMessage("ID already in use");
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
            setSuccessMessage('');
        }
    }

    const handleSendEmail = async () => {
        const payload = {
            name: studentDetails.name,
            id: studentDetails.studentId,
            password: inputsValue.password,
        };
        try {
            await sendEmail({
                to: email,
                subject: 'Student Login Details',
                payload: payload,
                templatePath: 'loginDetails.hbs'
            });
            setSuccessMessage("Email sent successfully!");
            setErrorMessage('');
        } catch (error) {
            setErrorMessage("Failed to send email. Please try again.");
            setSuccessMessage('');
        }
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile" && files) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                setErrorMessage("Only image files are allowed.");
                return;
            }
            setInputsValue(prev => ({ ...prev, profile: file }));
            setErrorMessage('');
        } else {
            setInputsValue(prev => ({ ...prev, [name]: value }));
        }
    }

    return (
        <>
            {!modalIsOpen ?
                <Box mb={4} display="flex" flexDirection="column" alignItems="center">
                    <AddStudentForm
                        inputsValue={inputsValue}
                        setInputsValue={setInputsValue}
                        handleSubmit={handleSubmit}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                </Box>
                :
                <ModalContent style={modalStyle.content}>
                    <Typography variant="h6" gutterBottom>Student Added Successfully</Typography>
                    <Typography>Name: {studentDetails?.name}</Typography>
                    <Typography>ID: {studentDetails?.studentId}</Typography>
                    <Typography>Password: ******** (Hidden for security)</Typography>
                    <CopyToClipboard text={`Name: ${studentDetails?.name}\nID: ${studentDetails?.studentId}\nPassword: ${inputsValue?.password}`}>
                        <Button variant="contained" onClick={() => setSuccessMessage("Copied to clipboard!")} style={{ marginTop: 16 }}>
                            <MdContentCopy />
                        </Button>
                    </CopyToClipboard>
                    <TextField
                        label="Enter student's email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginTop: 16 }}
                        required
                    />
                    {successMessage && (
                        <Message variant="body1" style={{ color: 'green' }}>
                            {successMessage}
                        </Message>
                    )}
                    {errorMessage && (
                        <Message variant="body1" style={{ color: 'red' }}>
                            {errorMessage}
                        </Message>
                    )}
                    <Button onClick={handleSendEmail} variant="contained" color="primary" style={{ marginTop: 16 }}>Send Email</Button>
                </ModalContent>
            }
        </>
    );
}

export default AddStudent;
