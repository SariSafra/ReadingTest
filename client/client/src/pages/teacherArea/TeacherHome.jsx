import React, { useEffect, useState, useContext } from 'react';
import { getStudents } from '../../services/api';
import AddStudent from './AddStudent';
import 'react-toastify/dist/ReactToastify.css';
import StudentShow from './StudentShow';
import { UserContext } from '../authentication/UserContext';
import styled from 'styled-components';
import { Container, Typography, List, ListItem, Paper, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled component for the main container
const StyledContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;

// Styled component for the list
const StyledList = styled(List)`
  max-width: 600px;
  margin: 0 auto;
`;

// Styled component for the header
const Header = styled(Typography)`
  margin-bottom: 20px;
`;

function TeacherHome() {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("teacher email: ", user.username);
        const response = await getStudents(user.username);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, [user]);

  return (
    <StyledContainer>
      <Header variant="h4" component="h1" gutterBottom>
        Welcome to the Teacher Home Page
      </Header>
      <AddStudent studentsArr={students} setStudentsArr={setStudents} />
      <Header variant="h5" component="h2" gutterBottom>
        Student List
      </Header>
      <StyledList>
        {students.map((student) => (
          <ListItem key={student.studentId}>
            <Paper elevation={3} style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box style={{ flex: 1 }}>
                <StudentShow student={student} studentsArr={students} setStudentsArr={setStudents} />
              </Box>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(student.studentId)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </ListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );

  function handleDelete(studentId) {
    // Implement delete functionality here
    console.log("Delete student with ID:", studentId);
  }
}

export default TeacherHome;
