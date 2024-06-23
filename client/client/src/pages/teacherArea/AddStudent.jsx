import { useState } from "react";
import { createStudent, sendEmail } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const AddStudent = () => {
    const [inputsValue, setInputsValue] = useState({ name: '', password: '', id: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            name: inputsValue.name,
            id: inputsValue.id,
            password: inputsValue.password,
            type: 'Student'
        };
        try {
            await createStudent(newStudent);
            setStudentDetails(newStudent);
            setModalIsOpen(true);
            toast.success("Student added successfully!");
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("ID already in use");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const handleSendEmail = async () => {
        const payload = {
            name: studentDetails.name,
            id: studentDetails.id,
            password: studentDetails.password, // Handle the password securely
        };
        try {
            await sendEmail({
                to: email,
                subject: 'Student Login Details',
                payload: payload,
                templatePath: './template/loginDetails.hbs'
            });

            toast.success("Email sent successfully!");
        } catch (error) {
            toast.error("Failed to send email. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>תלמיד חדש</h2>
                <input
                    type='text'
                    value={inputsValue.name}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, name: e.target.value }))}
                    placeholder='Name'
                    required
                />
                <input
                    type='text'
                    value={inputsValue.id}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, id: e.target.value }))}
                    placeholder='ID'
                    required
                />
                <input
                    type='password'
                    value={inputsValue.password}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, password: e.target.value }))}
                    placeholder='Password'
                    required
                />
                <button type="submit">הוספה</button>
            </form>
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Student Details"
            >
                <h2>Student Added Successfully</h2>
                <p>Name: {studentDetails?.name}</p>
                <p>ID: {studentDetails?.id}</p>
                <p>Password: ******** (Hidden for security)</p>
                <CopyToClipboard text={`Name: ${studentDetails?.name}\nID: ${studentDetails?.id}\nPassword: ${studentDetails?.password}`}>
                    <button onClick={() => toast.success("Copied to clipboard!")}>Copy Details</button>
                </CopyToClipboard>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter students's email"
                    required
                />
                <button onClick={handleSendEmail}>Send Email</button>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default AddStudent;
