import React, { useEffect, useState, useContext } from 'react';
import { getStudents } from '../../services/api';
import AddStudent from './addStudent/AddStudent.jsx';
import StudentShow from './StudentShow';
import { UserContext } from '../authentication/UserContext';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { StyledContainer, HeaderBox, StudentList, StyledListItem, StyledAvatar } from '../style/TeacherHome.js';

function TeacherHome() {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [curStudent, setCurStudent] = useState();
  const [toShowStudent, setToShowStudent] = useState(false);


  const fetchStudents = async () => {
    try {
      const response = await getStudents(user.username);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
      toast.error("Error fetching students");
    }
  };

  useEffect(() => {


    fetchStudents();
  }, [user]);

  const handleCloseStudent = () => {
    setToShowStudent(false);
  };

  const handleDisplayStudent = (student) => {
    setCurStudent(student);
    setToShowStudent(true);
  };

  return (
    <StyledContainer maxWidth={false}>
      <HeaderBox>
        <Typography variant="h5" component="h2">
          תלמידים
        </Typography>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </HeaderBox>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוספת תלמיד</DialogTitle>
        <DialogContent>
          <AddStudent handleClose={() => setOpen(false)} studentsArr={students} setStudentsArr={setStudents} fetchStudents={fetchStudents} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
      <StudentList>
        {students.map((student) => (
          <StyledListItem onClick={() => handleDisplayStudent(student)} key={student.studentId}>
            <StyledAvatar src={student.profileImageUrl} alt={student.name} />
            <Typography>{student.name}</Typography>
          </StyledListItem>
        ))}
      </StudentList>
      <Dialog open={toShowStudent} onClose={handleCloseStudent} fullWidth maxWidth="md">
        <DialogContent>
          <StudentShow student={curStudent} studentsArr={students} setStudentsArr={setStudents} setToShowStudent={setToShowStudent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudent} color="primary">סגור</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}

export default TeacherHome;