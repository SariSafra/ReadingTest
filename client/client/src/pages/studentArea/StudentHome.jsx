import React from 'react';
import {useNavigate} from 'react-router-dom'
const navigate = useNavigate();
function StudentHome() {
  return (
    <div>
      <h1>Welcome to the Student Home Page</h1>
      {/* Add more content here */}
      <button onClick = {()=>navigate('/test')}>start test</button>
    </div>
  );
}

export default StudentHome;
