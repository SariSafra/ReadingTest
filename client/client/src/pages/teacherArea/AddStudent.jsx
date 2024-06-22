import { useState } from "react";
import { createStudent } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
    const [inputsValue, setInputsValue] = useState({ name: '', password: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            name: inputsValue.name,
            email: inputsValue.email,
            password: inputsValue.password,
            type: 'Student'
        };
        try {
            await createStudent(newStudent);
            toast.success("Student added successfully!");
        }
        catch (error) {
            if (error.response.status == 400)
                toast.error("Name already in use");
            else
                toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>תלמיד חדש</h2>
                <input
                    type={'text'}
                    value={inputsValue.name}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={'Name'}
                    required
                />
                 <input
                    type={'email'}
                    value={inputsValue.email}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={'Email'}
                    required
                />
                <input
                    type="password"
                    value={inputsValue.namepassword}
                    onChange={(e) => setInputsValue(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Password"
                    required
                />
                <button type="submit">הוספה</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddStudent;