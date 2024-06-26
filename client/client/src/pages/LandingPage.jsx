import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="App">
      <h1>Welcome to Reading Diagnosis</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;