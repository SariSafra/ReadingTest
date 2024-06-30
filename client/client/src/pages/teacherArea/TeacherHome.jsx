import React, { useEffect, useState, useContext } from 'react';
import { getStudents } from '../../services/api';
import AddStudent from './AddStudent';
import 'react-toastify/dist/ReactToastify.css';
import StudentShow from './StudentShow';
import { UserContext } from '../authentication/UserContext'; // Import UserContext

function TeacherHome() {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("teacher email: ", user);
        const response = await getStudents(user); // Pass user data to getStudents
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, [user]);

  return (
    <div>
      <h1>Welcome to the Teacher Home Page</h1>
      <AddStudent studentsArr={students} setStudentsArr={setStudents} />
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            <StudentShow student={student} studentsArr={students} setStudentsArr={setStudents} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherHome;
