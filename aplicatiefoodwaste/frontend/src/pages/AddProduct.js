import React, { useState, useEffect } from 'react';
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
  const [userProducts, setUserProducts] = useState([]);

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userEmail}/products`);
      setUserProducts(response.data);
    } catch (error) {
      console.error('Fetch user products error:', error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, [userEmail]);

  const formattedDatesArray = (product) => {
    if (product) {
      const [year, month, day] =product.split('T')[0].split('-');
      return `${year}-${month}-${day}`;
    }
  };
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
        fetchUserProducts();

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

  const groupProductsByCategory = (products) => {
    const groupedProducts = {};

    products.forEach((product) => {
      const category = product.ProductCategory;

      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }

      groupedProducts[category].push(product);
    });

    return groupedProducts;
  };

  const groupedProducts = groupProductsByCategory(userProducts);


  return (
    <div className="container product">
      <h2></h2>
      <div>
        <label>Nume produs:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>

      <div>
        <label>Categorie:</label>
        <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
      </div>

      <div>
        <label>Data expirare:</label>
        <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
      </div>

      <div>
        <label>Cantitate:</label>
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
      <h2>Lista alimentelor din frigider</h2>
      </div>

      {/* Display the list of user products */}
      
      <table>
        <thead>
          <tr>
            <th>Categorie</th>
            <th>Nume produs</th>
            <th>Data expirare</th>
            <th>Cantitate</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedProducts).map((category) => (
            <React.Fragment key={category}>
              {groupedProducts[category].map((product) => (
                <tr key={product.productId}>
                  <td style={{ fontWeight: 'bold' }}>{category}</td>
                  <td>{product.ProductName}</td>
                  <td>{formattedDatesArray(product.ProductExpirationDate)}</td>
                  <td>{product.ProductQuantity}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>

  );

};

export default AddProduct;
