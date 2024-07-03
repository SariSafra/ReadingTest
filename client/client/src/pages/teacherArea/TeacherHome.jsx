import React, { useEffect, useState, useContext } from 'react';
import { getStudents, delStudent } from '../../services/api';
import AddStudent from './AddStudent';
import StudentShow from './StudentShow';
import { UserContext } from '../authentication/UserContext';
import { Container, Typography, List, Stack, ListItem, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Login from '../authentication/Login';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function TeacherHome() {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [curStudent, setCurStudent] = useState();
  const [toShowStudent, setToShowStudent] = useState(false);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents(user.username);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, [user]);

  const handleCloseStudent = () => {
    setToShowStudent(false);
  };

  const handleDisplayStudent = (student) => {
    setCurStudent(student);
    setToShowStudent(true);
  }

  return (
    <Container maxWidth={false} sx={{ width: '100%', mt: 4 }}>
      <Box display="flex" justifyContent="left" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Students
        </Typography>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <AddStudent handleClose={() => setOpen(false)} studentsArr={students} setStudentsArr={setStudents} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 0 }}>
        {students.map((student) => (
          <ListItem style={{ display: 'flex', flexDirection: 'column', width: 'auto', padding: '30px' }} onClick={() => handleDisplayStudent(student)} key={student.studentId}>
            <FolderSharedIcon style={{ width: '80%', height: 'auto' }} />
            <Typography>{student.name}</Typography>
          </ListItem>
        ))}
      </div>
      <Dialog open={toShowStudent} onClose={handleCloseStudent} fullWidth maxWidth="md">
        <DialogContent>
          <StudentShow student={curStudent} studentsArr={students} setStudentsArr={setStudents} setToShowStudent={setToShowStudent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudent} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeacherHome;
