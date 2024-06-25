import React, { useEffect, useState } from 'react';
import { getStudents } from '../../services/api';
import AddStudent from './AddStudent';
import ShowStudentDiagnosis from './ShowStudentDiagnosis';

function TeacherHome() {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents();
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students", error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Welcome to the Teacher Home Page</h1>
            <AddStudent />
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name}
                        <button onClick={() => {
    console.log(`Selected student ID: ${student.id}`);
    setSelectedStudentId(student._id);
}}>Show Diagnosis</button>
                    </li>
                ))}
            </ul>
            {selectedStudentId && <ShowStudentDiagnosis studentId={selectedStudentId} />}
        </div>
    );
}

export default TeacherHome;
