import React, { useState } from "react";
import { createStudent, sendEmail } from '../../services/api';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Webcam from 'react-webcam';
import { FilePicker } from 'react-file-picker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


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
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [toOpenUpload, setToOpenUpload] = useState(false);

    const webcamRef = React.useRef(null);

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
        if (name === "profile" && files) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                setErrorMessage("Only image files are allowed.");
                return;
            }
            setInputsValue(prev => ({ ...prev, profile: file }));
            setErrorMessage(''); // Clear any previous error messages
        } else {
            setInputsValue(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
                setInputsValue(prev => ({ ...prev, profile: file }));
                setIsCameraOpen(false);
                setErrorMessage(''); // Clear any previous error messages
            });
    };

    return (
        <>
            {!modalIsOpen ?
                <Box mb={4} display="flex" flexDirection="column" alignItems="center">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        <Button onClick={()=>setToOpenUpload(prev=>!prev)}>הוספת תמונה</Button>
                        {toOpenUpload &&<>
                         <div style = {{display: 'flex'}}>
                            <FilePicker
                                extensions={['jpg', 'jpeg', 'png']}
                                dims={{ minWidth: 100, maxWidth: 2500, minHeight: 100, maxHeight: 2500 }}
                                onChange={file => setInputsValue(prev => ({ ...prev, profile: file }))}
                                onError={errMsg => setErrorMessage(errMsg)}
                            >
                                <FileUploadIcon style={{margin: 10}}/>
                            </FilePicker>
                                <AddAPhotoIcon onClick={() => setIsCameraOpen(true)}  style={{ margin: 10 }}/>
                        </div>
                                {isCameraOpen && (
                        <div style={{margin: 16}}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={350}
                            />
                            <CheckCircleOutlineIcon onClick={handleCapture} />
                        </div>
                    )}
                       </>}
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
