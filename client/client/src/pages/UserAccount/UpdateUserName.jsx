import React from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';

const UpdateUserName = ({ formik, userDetails, editableField, handleEdit,setEditableField }) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
                {editableField === 'name' ? (
                    <TextField
                        fullWidth
                        margin="dense"
                        id="name"
                        name="name"
                        label="שם"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                ) : (
                    <Typography variant="body1">שם: {userDetails.name}</Typography>
                )}
            </Grid>
            <Grid item xs={4}>
                {editableField === 'name' ? (
                    <Button color="primary" onClick={() => {formik.handleSubmit(); setEditableField(null);}}>שמירה </Button>
                ) : (
                    <Button color="primary" onClick={() => handleEdit('name')}>עדכון</Button>
                )}
            </Grid>
        </Grid>
    );
};

export default UpdateUserName;
