import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Student Home Page</h1>
      {/* Add more content here */}
      <button onClick={() => navigate('/test')}>Start Test</button>
    </div>
  );
}

export default StudentHome;
