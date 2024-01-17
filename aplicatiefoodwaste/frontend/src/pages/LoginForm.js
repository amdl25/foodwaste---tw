// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        UserEmail: email,
        UserPassword: password,
      });

      // Handle the response accordingly (e.g., show a success message, redirect, etc.)
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
