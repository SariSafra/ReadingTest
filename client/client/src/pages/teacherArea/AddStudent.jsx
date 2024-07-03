import React, { useState } from "react";
import { createStudent, sendEmail } from '../../services/api';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

// Styled component for the modal content
const ModalContent = styled(Box)`
  padding: 20px;
  text-align: center;
  position: relative;
`;

// Styled component for the modal overlay
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        borderRadius: '8px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

// React Modal default setup
Modal.setAppElement('#root');

const Message = styled(Typography)`
  margin-top: 16px;
  font-weight: bold;
`;

const AddStudent = ({ studentsArr, setStudentsArr }) => {
    const [inputsValue, setInputsValue] = useState({ name: '', password: '', id: '', profile: null });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            name: inputsValue.name,
            id: inputsValue.id,
            password: inputsValue.password,
            type: 'Student',
            profile: inputsValue.profile
        };
        try {
            const savedStudent = await createStudent(newStudent);
            setStudentDetails(savedStudent.data);
            setSuccessMessage("Student added successfully!");
            setErrorMessage('');
            setModalIsOpen(true);
            setStudentsArr([...studentsArr, savedStudent.data]);
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
            id: studentDetails.id,
            password: studentDetails.password, // Handle the password securely
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
        if (name === "profile") {
            setInputsValue(prev => ({ ...prev, profile: files[0] }));
        } else {
            setInputsValue(prev => ({ ...prev, [name]: value }));
        }
    }

    return (
        <>
            {!modalIsOpen ?
                <Box mb={4} display="flex" flexDirection="column" alignItems="center">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" gutterBottom>Add New Student</Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={inputsValue.name}
                            onChange={handleInputChange}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <TextField
                            label="ID"
                            variant="outlined"
                            name="id"
                            value={inputsValue.id}
                            onChange={handleInputChange}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={inputsValue.password}
                            onChange={handleInputChange}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <input
                            type="file"
                            name="profile"
                            onChange={handleInputChange}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">Add</Button>
                    </form>
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
                </Box>
                :
                <Box>
                    <Typography variant="h6" gutterBottom>Student Added Successfully</Typography>
                    <Typography>Name: {studentDetails?.name}</Typography>
                    <Typography>ID: {studentDetails?.id}</Typography>
                    <Typography>Password: ******** (Hidden for security)</Typography>
                    <CopyToClipboard text={`Name: ${studentDetails?.name}\nID: ${studentDetails?.id}\nPassword: ${studentDetails?.password}`}>
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
                    </Box>
            }
        </>
    );
}

export default AddStudent;
