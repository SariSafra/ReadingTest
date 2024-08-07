import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../authentication/UserContext.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getTeacher, updateTeacher, getStudent, updateStudent } from '../../services/api.js';
import UpdateProfileImage from './UpdateProfileImage.jsx';
import UpdateUserName from './UpdateUserName.jsx';

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
            } catch (error) {
                toast.error('לא הצלחנו למצא אותך במערכת');
            }
        };

        fetchUserDetails();
    }, [user]);

    const formik = useFormik({
        initialValues: { name: userDetails ? userDetails.name : '', filePath: null },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'השם קצר מדי!').max(30, '!השם ארוך מדי').required('זהו שדה חובה'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                let response;
                if (user.role === 'teacher') {
                    response = await updateTeacher(user.username, formData);
                } 
                else if (user.role === 'student') {
                    if (values.filePath) {
                        formData.append('file', values.filePath);
                    }
                    response = await updateStudent(user.username, formData);
                }
                toast.success('פרטי משתמש עודכנו בהצלחה');
                setEditableField(null);
                if (response && response.data) {
                    setUserDetails(response.data);
                }
            } catch (error) {
                toast.error('עדכון פרטי משתמש נכשל');
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
                עדכון פרטי {user.role === 'teacher' ? 'מורה' : 'תלמיד'}
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                {userDetails && (
                    <>
                        <UpdateUserName
                            formik={formik}
                            userDetails={userDetails}
                            editableField={editableField}
                            handleEdit={handleEdit}
                            setEditableField={setEditableField}
                        />
                        {user.role === 'teacher' && (
                            <>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={8}>
                                        <Typography variant="body1">מייל: {userDetails.email}</Typography>
                                    </Grid>
                                </Grid>
                                <Link to={'/password-reset-request'}>שינוי סיסמא</Link>
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
                <Link to={`/home/${user.role}`}>חזרה חעמוד הבית</Link>
            </form>
            <ToastContainer />
        </Container>
    );
};

export default UserAccount;
