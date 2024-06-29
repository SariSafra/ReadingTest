import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import ShowStudentDiagnosis from "./ShowStudentDiagnosis";
import { delStudent } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';

const StudentShow = ({ student, studentsArr, setStudentsArr }) => {
    const [toShowDiagnosis, setToShowDiagnosis] = useState(false);

    const handleStudentDelete = async (studentId) => {
        const name = prompt("For deletion enter the student name", "");
        if (name != null && name != "") {
            try {
                await delStudent(studentId);
                setStudentsArr(studentsArr.filter(student => student.studentId !== studentId));
                toast.success("Student deleted successfully");
            } catch (error) {
                toast.error("Failed to delete student");
            }
        }
    };

    return (
        <><div>
            <p>{student.name} {student.studentId}</p>
            <button onClick={() => setToShowDiagnosis(true)}>Show Diagnosis</button>
            <button onClick={() => handleStudentDelete(student.studentId)}><AiTwotoneDelete /></button>
            {toShowDiagnosis && <ShowStudentDiagnosis studentId={student._id} />}
        </div>

        </>
    )
};

export default StudentShow;