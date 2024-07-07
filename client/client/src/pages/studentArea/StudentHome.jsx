import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ברוכים הבאים לאותילוגיה</h1>
      {/* Add more content here */}
      <button onClick={() => navigate('/home/test')}>להתחלת מבחן</button>
    </div>
  );
}

export default StudentHome;