import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';

const AddProduct = () => {
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/add-product', {
        ProductName: productName,
        ProductCategory: productCategory,
        ProductExpirationDate: expirationDate,
        ProductQuantity: quantity,
        UserEmail: userEmail

        // Add UserId or any other relevant attributes as needed
      });

      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');

      }
    } catch (error) {
      console.error('Add product error:', error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
      }

      setErrorMessage('Error adding product. Please try again.');
      setSuccessMessage('');
    }

  };
  const goBack = () => {
    // Navigate back to /login/principal
    navigate('/login/principal/'+ userEmail);
  };


  return (
    <div className="container product">
      <h2></h2>
      <div>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>

      <div>
        <label>Product Category:</label>
        <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
      </div>

      <div>
        <label>Expiration Date:</label>
        <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
      </div>

      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>

      <div class="btnContainer">
      <button class="btnProdus" onClick={handleAddProduct}>Adauga produs</button>
      <button class="btnReturn" onClick={goBack}>Intoarce-te in pagina principala</button>
      </div>
      <div>
        {successMessage && (
          <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
        )}
      </div>
    </div>
  );

};

export default AddProduct;
