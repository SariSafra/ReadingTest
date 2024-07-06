import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, Box, IconButton, Typography } from '@mui/material';
import { FilePicker } from 'react-file-picker';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfileImage = ({ formik, userDetails, newImage, setNewImage }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [toOpenUpload, setToOpenUpload] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const webcamRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(userDetails.profileImageUrl || '');

    useEffect(() => {
        if (newImage) {
            const url = URL.createObjectURL(newImage);
            setImageUrl(url);
            setShowSaveButton(true);
            return () => URL.revokeObjectURL(url);
        } else {
            setImageUrl(userDetails.profileImageUrl || '');
            setShowSaveButton(false);
        }
    }, [newImage, userDetails.profileImageUrl]);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
                formik.setFieldValue('filePath', file);
                setNewImage(file);
                setIsCameraOpen(false);
            });
    };

    const handleSaveImage = async () => {
        try {
            await formik.submitForm();
            setShowSaveButton(false);
        } catch (error) {
            toast.error('Failed to save image');
        }
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Profile Image
            </Typography>
            <Avatar src={imageUrl} sx={{ width: 150, height: 150 }} />
            <Button onClick={() => setToOpenUpload(prev => !prev)}>Update Image</Button>
            {toOpenUpload && (
                <>
                    <Box display="flex" alignItems="center" marginTop={2}>
                        <FilePicker
                            extensions={['jpg', 'jpeg', 'png']}
                            dims={{ minWidth: 100, maxWidth: 2500, minHeight: 100, maxHeight: 2500 }}
                            onChange={file => {
                                formik.setFieldValue('filePath', file);
                                setNewImage(file);
                            }}
                            onError={errMsg => toast.error(errMsg)}
                        >
                            <IconButton component="span">
                                <FileUploadIcon />
                            </IconButton>
                        </FilePicker>
                        <IconButton component="span" onClick={() => setIsCameraOpen(true)}>
                            <AddAPhotoIcon />
                        </IconButton>
                    </Box>
                    {isCameraOpen && (
                        <Box mt={2}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={350}
                            />
                            <IconButton component="span" onClick={handleCapture}>
                                <CheckCircleOutlineIcon />
                            </IconButton>
                        </Box>
                    )}
                </>
            )}
            {showSaveButton && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveImage}
                    style={{ marginTop: 16 }}
                >
                    Save Image
                </Button>
            )}
        </>
    );
};

export default UpdateProfileImage;
