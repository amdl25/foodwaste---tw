import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSignup = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/signup', {
          UserFirstName: firstName,
          UserLastName: lastName,
          UserEmail: email,
          UserPassword: password,
        });
  
        console.log(response.data);
        // Assuming your backend sends a success message
        // You can display a success message to the user or redirect to another page
      } catch (error) {
        // Handle errors (e.g., display an error message)
        if (error.response && error.response.data && error.response.data.message === 'User already exists') {
          // User already exists error
          setErrorMessage('User already exists. Please choose a different email.');
        } else {
          // Other errors
          setErrorMessage('An error occurred. Please try again.');
        }
      }
    };

  return (
    <div className="container mt-5">
      <h2>Sign up Page</h2>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleSignup}>Signup</button>
      
      <div>
      {errorMessage && (
        <h3 className="error" style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </h3>
      )}
      </div>
    </div>
  );
};

export default Signup;
