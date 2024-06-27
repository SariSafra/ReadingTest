import React, { useEffect, useState } from 'react';
import { getStudents, delStudent } from '../../services/api';
import AddStudent from './AddStudent';
import ShowStudentDiagnosis from './ShowStudentDiagnosis';
import { AiTwotoneDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const handleStudentDelete = async (studentId) => {
        try {
            await delStudent(studentId);
            setStudents(students.filter(student => student.studentId !== studentId));
            toast.success("Student deleted successfully");
        } catch (error) {
            toast.error("Failed to delete student");
        }
    };


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
                    <button onClick={() => handleStudentDelete(student.studentId)}><AiTwotoneDelete /></button>
                </li>
            ))}
        </ul>
        {selectedStudentId && <ShowStudentDiagnosis studentId={selectedStudentId} />}
    </div>
);
}

export default TeacherHome;
