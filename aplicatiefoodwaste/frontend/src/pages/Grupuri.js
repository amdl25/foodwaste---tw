import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToGroup = () => {
  const [userEmail, setUserEmail] = useState('');
  const [grupName, setGrupName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/grup');

        setGroups(response.data);
        setLoading(false);
        setError('');
      } catch (error) {
        console.error('Fetch groups error:', error);

        if (error.response) {
          console.error('Error response from server:', error.response.data);
          setError(error.response.data.error || 'Server error. Please try again.');
        } else {
          setError('Error fetching groups. Please try again.');
        }

        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  console.log('Groups:', groups);
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

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className = "listaGrupuri">
      <h1>Lista grupurilor existente</h1>
      <ul className="list">
          {groups.map((group) => (
            <li key={group.grupid}>
              {group.GrupName}
            </li>
          ))}
        </ul>
        </div>
        </div>
      
    </div>
  );
};

export default AddToGroup;
