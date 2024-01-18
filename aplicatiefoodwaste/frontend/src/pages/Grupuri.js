import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToGroup = () => {
  const [userEmail, setUserEmail] = useState('');
  const [grupName, setGrupName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [usersInGroups, setUsersInGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUsersInGroups = async () => {
      try {
        const groupsResponse = await axios.get('http://localhost:8000/api/grup');
        setGroups(groupsResponse.data);
        const response = await axios.get('http://localhost:8000/api/usersInGroups');
        setUsersInGroups(response.data);
        setErrorMessage('');
      } catch (error) {
        console.error('Fetch groups error:', error);

        if (error.response) {
          console.error('Error response from server:', error.response.data);
          setErrorMessage(error.response.data.error || 'Server error. Please try again.');
        } else {
          setErrorMessage('Error fetching groups. Please try again.');
        }

      }
    };

    fetchUsersInGroups();
  }, []);

  const handleAddToGrup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/add-to-group', {
        UserEmail: userEmail,
        GrupName: grupName,
      });

      if (response.status === 200) {
        setSuccessMessage('User added to Grup successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Add to Grup error:', error);

      if (error.response) {
        console.error('Error response from server:', error.response.data);
        setErrorMessage(error.response.data.error || 'Server error. Please try again.');
        setSuccessMessage('');
      } else {
        setErrorMessage('Error adding user to Grup. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className = "container grup">
      <div className = "elementeGrup">
      <input
        type="text"
        placeholder="User Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grup Name"
        value={grupName}
        onChange={(e) => setGrupName(e.target.value)}
      />
      <button onClick={handleAddToGrup}>Add to Grup</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className = "listaGrupuri">
      <h1>Lista grupurilor existente</h1>
      <ul className="list">
    {usersInGroups
    .filter((user) => user.groups.length > 0) // Filter out users with no groups
    .map((user) => (
      <li key={user.UserId}>
        <strong>User Email:</strong> {user.UserEmail}
        <ul>
          {user.groups.map((groupName) => (
            <li key={groupName}>{groupName}</li>
          ))}
        </ul>
            </li>
          ))}
        </ul>
        </div>
        </div>
      
    </div>
  );
};

export default AddToGroup;
