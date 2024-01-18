import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import './stiluri.css';

const FriendshipDisplay = () => {
  const { userEmail } = useParams();
  const [searchEmail, setSearchEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdaugaPrieten = async () => {
    try {
      const senderEmail = userEmail;
      const receiverEmail = searchEmail;
  
      const response = await axios.post('http://localhost:8000/api/send-request', {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
      });
  
      if (response.status === 201) {
        setSuccessMessage('Friendship request sent successfully!');
        setErrorMessage('');
      } else{
        setErrorMessage('Error sending friendship request. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Adauga error:', error);
  
      if (error.response) {
        console.error('Error response from server:', error.response.data);
  
        // Check if the error message indicates that friendship request already exists
        if (error.response.data.error === 'Friendship request already exists') {
          setErrorMessage('Friendship request already exists.');
        } else {
          setErrorMessage('Server error. Please try again.');
        }
  
        setSuccessMessage('');
      } else {
        setErrorMessage('Error sending friendship request. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  const handleAcceptare = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/accept-friend-request', {
        userEmail: userEmail,
        senderEmail: searchEmail,
      });

      if (response.status === 200 && response.data.message == 'Friend request accepted successfully') {
        setSuccessMessage('Friend request accepted successfully');
        setErrorMessage('');
      } 

    } catch (error) {
      console.error('Accept friend request error:', error);
      setErrorMessage('Error accepting friend request. Please try again.');
      setSuccessMessage('');
    }
  };


  const handleSearchFriend = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/` + searchEmail);
      console.log('Response:', response);
  
      if (response.status === 200 ) {
        if (response.data && response.data.message === 'User exists') {
          setSuccessMessage('User exists!');
          setErrorMessage('');
        }
        
      }
    } catch (error) {
      console.error('Search friend error:', error);
      setErrorMessage('User does not exist');
      setSuccessMessage('');
    }
  };

  
  const [friendshipRequests, setFriendshipRequests] = useState([]);

  useEffect(() => {
    const fetchFriendshipRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/friendshipRequest - list');
        setFriendshipRequests(response.data);
      } catch (error) {
        console.error('Error fetching friendship requests:', error);
      }
    };

    fetchFriendshipRequests();
  }, []);

  return (
    <div className="container">
    {/* Left Panel */}
    <div className="left-panel">
    <input
        type="text"
        placeholder="Cauta prieten dupa email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
      />
      <div class="butoaneFriendship">
      <button className="buttonCauta" onClick={handleSearchFriend}>
        Search
      </button>
      <button className="buttonAdauga" onClick={handleAdaugaPrieten}>
        Adauga prieten
      </button>
      </div>

      <div>
        {successMessage && (
          <p style={{ color: 'green', marginBottom: '50px' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginBottom: '50px' }}>{errorMessage}</p>
        )}
      </div>

    {/* Right Panel */}
    <div className="right-panel">
    <ul className="list">
      <h1>Lista cereri prietenie</h1>
      <ul>
        {friendshipRequests.map((friendshipRequest) => (
          <li key={friendshipRequest.id}>
            {/* Render details of each friendship request */}
            {/* <p>Sender ID: {friendshipRequest.senderId}</p> */}
            <p>User First Name: {friendshipRequest.User.UserFirstName}</p>
            <p>User Last Name: {friendshipRequest.User.UserLastName}</p>
            <p>User Email: {friendshipRequest.User.UserEmail}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
      </ul>

      <div className="bottom-section">
      <input type="text" placeholder="Email celui care a cerut prietenia" />
        <button onClick={handleAcceptare}>Accepta prietenie</button>
        
      </div>
    </div>
  </div>
    <div>
      
</div>
</div>
  );
};


export default FriendshipDisplay;

