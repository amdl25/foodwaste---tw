// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
          UserEmail: email,
          UserPassword: password,
      });
  
      if (response.status === 200) {
        console.log('Logged in successfully:', response.data);
        setSuccessMessage('Logged in successfully!');
        setErrorMessage(''); // Clear any previous error message
    }
} catch (error) {
    console.error('Login error:', error);

    if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
    }

    if (error.response && error.response.status === 401) {
        // Invalid credentials
        setErrorMessage('Invalid credentials. Please check your email and password.');
        setSuccessMessage(''); // Clear any previous success message
    } else {
        setErrorMessage('An error occurred. Please try again.');
        setSuccessMessage(''); // Clear any previous success message
    }
  }
};


return (
  <div className="container login">
    <h2>Login</h2>
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

    <button onClick={handleLogin}>Login</button>

    <div>
      {successMessage && (
        <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
      )}
    </div>
  </div>
);
};


export default Login;
