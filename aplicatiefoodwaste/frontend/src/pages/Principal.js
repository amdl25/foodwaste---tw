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

  return (
    <div className="main-container">
      {/* Left Panel */}
      <div className="left-panel">
        {/* Button to navigate to addProduct page */}
        <button className="button" onClick={handleAddProductClick}>
          Adauga produs
        </button>
        <button className="button" onClick={handleSeeingFriendship}>Vizualizeaza prietenii</button>
        <button className="button">Grupuri</button>
        <button className="button">Button 4</button>
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
  );
};

export default Principal;
