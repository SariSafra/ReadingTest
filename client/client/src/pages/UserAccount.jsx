import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from './authentication/UserContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getTeacher, updateTeacher, getStudent, updateStudent } from '../services/api.js';
import UpdateProfileImage from './UpdateProfileImage';
import UpdateUserName from './UpdateUserName';

const UserAccount = () => {
    const { user } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState(null);
    const [editableField, setEditableField] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                let response;
                if (user.role === 'teacher') {
                    response = await getTeacher(user.username);
                } else if (user.role === 'student') {
                    response = await getStudent(user.username);
                }
                setUserDetails(response.data);
                toast.success('User details fetched successfully');
            } catch (error) {
                toast.error('Failed to fetch user details');
            }
        };

        fetchUserDetails();
    }, [user]);

    const formik = useFormik({
        initialValues: { name: userDetails ? userDetails.name : '', filePath: null },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Name is required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                if (user.role === 'teacher') {
                    response = await updateTeacher(user.username,  formData);
                } 
                else if (user.role === 'student') {
                    formData.append('name', values.name);
                    if (values.filePath) {
                        formData.append('file', values.filePath);
                    }
                    response = await updateStudent(user.username, formData);
                }
                let response;

                toast.success('User details updated successfully');
                setEditableField(null);
                if (response && response.data) {
                    setUserDetails(response.data);
                }
            } catch (error) {
                toast.error('Failed to update user details');
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (userDetails) {
            formik.setValues({
                name: userDetails.name,
                filePath: null,
            });
        }
    }, [userDetails]);

    const handleEdit = (field) => {
        setEditableField(field);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Update {user.role === 'teacher' ? 'Teacher' : 'Student'} Details
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                {userDetails && (
                    <>
                        <UpdateUserName
                            formik={formik}
                            userDetails={userDetails}
                            editableField={editableField}
                            handleEdit={handleEdit}
                        />
                        {user.role === 'teacher' && (
                            <>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={8}>
                                        <Typography variant="body1">Email: {userDetails.email}</Typography>
                                    </Grid>
                                </Grid>
                                <Link to={'/password-reset-request'}>Change Password</Link>
                            </>
                        )}
                        {user.role === 'student' && (
                            <UpdateProfileImage
                                formik={formik}
                                userDetails={userDetails}
                                newImage={newImage}
                                setNewImage={setNewImage}
                            />
                        )}
                    </>
                )}
                <br />
                <Link to={`/home/${user.role}`}>Return to Home</Link>
            </form>
        </Container>
    );
};

export default UserAccount;
