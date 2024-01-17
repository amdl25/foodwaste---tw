import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stiluri.css';

const Principal = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();

  const handleAddProductClick = () => {
    // Navigate to the addProduct page
    navigate('/login/principal/add-product/' + userEmail);
  };

  const handleSeeingFriendship = () => {
    // Navigate to the addProduct page
    navigate('/login/principal/friendship/' + userEmail);
  };

  const handleSeeingGrupuri = () => {
    // Navigate to the addProduct page
    navigate('/login/principal/grupuri/' + userEmail);
  };

  return (
    <div className="main-container">
      {/* Left Panel */}
      <div className="left-panel">
        {/* Button to navigate to addProduct page */}
        <button className="button" onClick={handleAddProductClick}>
          Adauga produs
        </button>
        <button className="button" onClick={handleSeeingFriendship}>Cereri prietenie</button>
        <button className="button" onClick={handleSeeingGrupuri}>Grupuri</button>
        <button className="button">Lista prieteni</button>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <ul className="list">
          <h1>Lista alimente disponibile</h1>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
          {/* Add more list items as needed */}
        </ul>

        <div className="bottom-section">
          <button >Alege aliment</button>
          <input type="text" placeholder="Il vreau!" />
          <input type="text" placeholder="Id-ul posesorului" />
        </div>
      </div>
    </div>
  );
};

export default Principal;
