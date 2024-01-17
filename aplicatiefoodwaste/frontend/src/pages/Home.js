import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div>
        <h1 className='titlu'>Aplicatie food waste</h1>
        <h2 className='about'>Realizat de: Mihai Andreea-Madalina, Margalina Mariana Narcisa</h2>
      </div>
      <h2 className="mb-4">Pagina de autentificare: </h2>

      <h3 className='info'>Grupa 1091 - seria D</h3>
      <h3 className='info2'>2024</h3>

      <div>
        <button className="button-home" onClick={handleLogin}>
          Log in
        </button>
        <button className="button-home" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
}
