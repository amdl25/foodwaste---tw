import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stiluri.css'

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic
    // Redirect to the login page
    navigate('/login');
  };

  const handleSignUp = () => {
    // Handle sign-up logic
    // Redirect to the sign-up page
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className = "containerHome">
        <h1 className='titlu'>Aplicatie food waste</h1>
      

      <div className = "btnHome">
        <button className="button-home" onClick={handleLogin}>
          Log in
        </button>
        <button className="button-home" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
}
