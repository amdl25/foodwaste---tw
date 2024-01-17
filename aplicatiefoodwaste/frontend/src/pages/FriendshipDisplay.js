import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import './stiluri.css';

const FriendshipDisplay = () => {
  const { userEmail } = useParams();
  const [searchEmail, setSearchEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearchFriend = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/` + searchEmail);
      console.log('Response:', response);

      
        if(response.status === 404 && response.data.message === 'User does not exist' ) {
          setErrorMessage('User not found.');
          setSuccessMessage('');
        }
        else if (response.status === 200) {
        if (response.data && response.data.message === 'User exists') {
          setSuccessMessage('User exists!');
          setErrorMessage('');
        }}
    } catch (error) {
      console.error('Search friend error:', error);
      setErrorMessage('Error searching for friend. Please try again.');
      setSuccessMessage('');
    }
  }

  const handleAdaugaPrieten = async () => {
    try {
      // Assuming you have senderId and receiverId from somewhere
      const senderId = userEmail; // Replace with actual senderId
      const receiverId = searchEmail; // Replace with actual receiverId

      const response = await axios.post('http://localhost:8000/api/send-request', {
        senderId: senderId,
        receiverId: receiverId,
      });

      if (response.status === 201) {
        setSuccessMessage('Friendship request sent successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage('Error sending friendship request. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Adauga error:', error);

      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found.');
        setSuccessMessage('');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Friendship request already exists.');
        setSuccessMessage('');
      } else {
        setErrorMessage('Error sending friendship request. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="main-container">
    {/* Left Panel */}
    <div className="left-panel">
    <input
        type="text"
        placeholder="Cauta prieten dupa email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
      />
      <button className="buttonCauta" onClick={handleSearchFriend}>
        Search
      </button>
      <button className="buttonAdauga" onClick={handleAdaugaPrieten}>
        Adauga prieten
      </button>

      <div>
        {successMessage && (
          <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
        )}
      </div>

    {/* Right Panel */}
    <div className="right-panel">
      <ul className="list">
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        {/* Add more list items as needed */}
      </ul>

      <div className="bottom-section">
        <button className="button">Bottom Button</button>
        <input type="text" placeholder="Enter something" />
      </div>
    </div>
  </div>
    <div>
      
</div>
</div>
  );
};

export default FriendshipDisplay;
