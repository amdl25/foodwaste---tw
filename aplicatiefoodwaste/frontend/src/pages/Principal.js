import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './stiluri.css';

const Principal = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const [products, setProducts] = useState([]);
  const [mesaj, stateMesaj] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


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

  const handleAnnounceOwner= async () => {
      // Send a request to your backend to remove the selected product
     
      stateMesaj('Ownerul va fi notificat');
    }
  

  const fetchProductList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Fetch product list error:', error);
    }
  };


  useEffect(() => {
    fetchProductList();
  }, []);

  const formattedDatesArray = (product) => {
    if (product) {
      const [year, month, day] =product.split('T')[0].split('-');
      return `${year}-${month}-${day}`;
    }
  };

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/friendship/${userEmail}`);
        setFriendsList(response.data);
        setError('');
      } catch (error) {
        console.error('Fetch friend list error:', error);

        if (error.response) {
          console.error('Error response from server:', error.response.data);
          setError(error.response.data.error || 'Server error. Please try again.');
        } else {
          setError('Error fetching friend list. Please try again.');
        }

        setLoading(false);
      }
    };

    fetchFriendsList();
  }, [userEmail]);


  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        {/* Button to navigate to addProduct page */}
      
        <button className="button" onClick={handleAddProductClick}>
          Adauga produs
        </button>
        <button className="button" onClick={handleSeeingFriendship}>Cereri prietenie</button>
        <button className="button" onClick={handleSeeingGrupuri}>Grupuri</button>
        </div>
     

      {/* Right Panel */}
      <div className="right-panel">
        <h1>Lista alimentelor disponibile</h1>
      <ul className="list">
    {products.map((product) => (
      <li key={product.productId}>
        {product.ProductName} ------ {product.ProductCategory} -----Expiration Date:{ formattedDatesArray(product.ProductExpirationDate)}
        .------id-posesor = {product.UserId}
      </li>
    ))}
  </ul>


        <div className="bottom-section">
          <button onClick = {handleAnnounceOwner} >Alege aliment</button>
          <input type="text" placeholder="Il vreau!"/>
          <input type="text" placeholder="Id-ul posesorului"/>
          {mesaj && (
           <p style={{ color: 'green', marginTop: '10px' }}>{mesaj}</p>
          )}
        </div>
      </div>

      <div className="friend-list">
      <h1>Lista prietenilor</h1>
        <ul>
        {friendsList.map((friendship) => (
          <li key={friendship.FriendshipId}>
            {/* Display only the names of friends associated with the userEmail */}
            {friendship.Sender.UserEmail === userEmail
              ? ` ${friendship.Receiver.UserEmail}`
              : ` ${friendship.Sender.UserEmail}`}
          </li>
        ))}
      </ul>

    </div>

    </div>
  );
};

export default Principal;
