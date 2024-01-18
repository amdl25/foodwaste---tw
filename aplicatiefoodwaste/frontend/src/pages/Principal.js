import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './stiluri.css';

const Principal = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [mesaj, stateMesaj] = useState(null);

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

  const handleRemoveProduct = async () => {
      // Send a request to your backend to remove the selected product
      try {
        await axios.delete(`http://localhost:8000/api/product/` );
        // Update the product list after successful removal
        fetchProductList();
        // Reset selectedProductId
      } catch (error) {
        console.error('Error removing product:', error);
      }

      stateMesaj('Userul va fi notificat');
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
        <button className="button">Lista prieteni</button>
        </div>
     

      {/* Right Panel */}
      <div className="right-panel">
        <h1>Lista alimentelor disponibile</h1>
      <ul className="list">
    {products.map((product) => (
      <li key={product.productId}>
        {product.ProductName} ------ {product.ProductCategory} ----- {product.ProductExpirationDate}
        .------id-posesor = {product.UserId}
      </li>
    ))}
  </ul>


        <div className="bottom-section">
          <button onClick = {handleRemoveProduct} >Alege aliment</button>
          <input type="text" placeholder="Il vreau!" />
          <input type="text" placeholder="Id-ul posesorului" />
          {mesaj && (
  <p style={{ color: 'green', marginTop: '10px' }}>{mesaj}</p>
)}
        </div>
      </div>

    </div>
  );
};

export default Principal;
