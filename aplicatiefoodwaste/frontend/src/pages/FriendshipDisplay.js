import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import './stiluri.css';

const FriendshipDisplay = () => {
  const { userEmail } = useParams();
  const [searchEmail, setSearchEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/send-request' + userEmail);
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  // Fetch friend requests when the component mounts
  useEffect(() => {
    fetchFriendRequests();
  }, []);
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
      const senderEmail = userEmail;
      const receiverEmail = searchEmail;
  
      const response = await axios.post('http://localhost:8000/api/send-request', {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
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
          {friendRequests.map((friend) => (
            <li key={friend.FriendshipRequestId}>{/* Display friend request details */}</li>
          ))}
     </ul>

      <div className="bottom-section">
        <button>Bottom Button</button>
        <input type="text" placeholder="Enter something" />
      </div>
    </div>
  </div>
    <div>
      
</div>
</div>
  );
};

// export default FriendshipDisplay;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import './stiluri.css';

// const FriendshipDisplay = () => {
//   const { userEmail } = useParams();
//   const [searchEmail, setSearchEmail] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [friendRequests, setFriendRequests] = useState([]); // New state for friend requests

//   useEffect(() => {
//     // Assuming you have an API endpoint that fetches friend requests for a user
//     const fetchFriendRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/friendshipRequest`);
//         if (response.status === 200) {
//           setFriendRequests(response.data || []);
//         } else {
//           setErrorMessage('Error fetching friend requests.');
//         }
//       } catch (error) {
//         console.error('Error fetching friend requests:', error);
//         setErrorMessage('Error fetching friend requests. Please try again.');
//       }
//     };

//     // Call the function to fetch friend requests
//     fetchFriendRequests();
//   }, []); // Dependency on userEmail

//   const handleSearchFriend = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/user/${searchEmail}`);

//       if (response.status === 200 && response.data.message === 'User exists') {
//         setSuccessMessage('User exists!');
//         setErrorMessage('');
//       } else {
//         setErrorMessage('User not found.');
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       console.error('Search friend error:', error);
//       setErrorMessage('Error searching for friend. Please try again.');
//       setSuccessMessage('');
//     }
//   };

//   const handleAdaugaPrieten = async () => {
//     // Your existing logic for adding a friend
//   };

//   return (
//     <div className="main-container">
//       {/* Left Panel */}
//       <div className="left-panel">
//         <input
//           type="text"
//           placeholder="Cauta prieten dupa email"
//           value={searchEmail}
//           onChange={(e) => setSearchEmail(e.target.value)}
//         />
//         <button className="buttonCauta" onClick={handleSearchFriend}>
//           Search
//         </button>
//         <button className="buttonAdauga" onClick={handleAdaugaPrieten}>
//           Adauga prieten
//         </button>

//         <div>
//           {successMessage && (
//             <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
//           )}
//           {errorMessage && (
//             <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="right-panel">
//         <ul className="list">
//           {friendRequests.map((friendRequest) => (
//             <li key={friendRequest.FriendshipRequestId}>
//               {/* Display friend request details */}
//               {/* For example: {friendRequest.senderId}, {friendRequest.receiverId}, etc. */}
//             </li>
//           ))}
//         </ul>

//         <div className="bottom-section">
//           <button>Bottom Button</button>
//           <input type="text" placeholder="Enter something" />
//         </div>
//       </div>
//     </div>
//   );
// };

export default FriendshipDisplay;

