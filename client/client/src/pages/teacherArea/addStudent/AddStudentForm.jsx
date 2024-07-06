import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import UpdateProfileImage from '../../iserAccount/UpdateProfileImage';
import { Message } from '../../style/addStudent.js';

const AddStudentForm = ({ 
    inputsValue, 
    setInputsValue, 
    handleSubmit, 
    successMessage, 
    errorMessage, 
    setErrorMessage 
}) => {
    const [newImage, setNewImage] = useState(null);

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>Add New Student</Typography>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={inputsValue.name}
                onChange={(e) => setInputsValue({ ...inputsValue, name: e.target.value })}
                style={{ marginBottom: 16 }}
                required
            />
            <TextField
                label="ID"
                variant="outlined"
                name="id"
                value={inputsValue.id}
                onChange={(e) => setInputsValue({ ...inputsValue, id: e.target.value })}
                style={{ marginBottom: 16 }}
                required
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={inputsValue.password}
                onChange={(e) => setInputsValue({ ...inputsValue, password: e.target.value })}
                style={{ marginBottom: 16 }}
                required
            />
            <UpdateProfileImage 
                formik={{
                    setFieldValue: (field, value) => {
                        setInputsValue({ ...inputsValue, profile: value });
                    }
                }}
                userDetails={{ profileImageUrl: 'http://localhost:3000/profile-image/profile.png' }}
                newImage={newImage}
                setNewImage={setNewImage}
            />
            <Button type="submit" variant="contained" color="primary">Add</Button>
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
        </form>
    );
}

export default AddStudentForm;