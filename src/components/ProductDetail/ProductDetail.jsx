import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import OptionSelector from '../OptionSelector/OptionSelector';
import { CartContext } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isFirstOptionSelected()) {
      setError('Please select an option from the Spicy Level.');
      return;
    }

    const cartId = localStorage.getItem('cartId'); // Assuming you store cartId in localStorage
    await addToCart(product.id, selectedOptions, quantity, cartId);
    setAddedToCart(true);
    setError('');
  };

  const isFirstOptionSelected = () => {
    const firstOptionList = product.option_lists[0];
    return selectedOptions.some(option => firstOptionList.options.some(opt => opt.id === option.id));
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  return (
    product && (
      <div className="product-detail">
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          {product.option_lists && product.option_lists.length > 0 ? (
            product.option_lists.map((optionList, index) => (
              <OptionSelector
                key={optionList.id}
                optionList={optionList}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                isMultiSelect={index !== 0}
              />
            ))
          ) : (
            <p>No options available for this product.</p>
          )}
          {error && <p className="error">{error}</p>}
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="buttons">
            {addedToCart ? (
              <button className="btn" onClick={() => navigate(`/cart/${localStorage.getItem('cartId')}`)}>Go to Cart</button>
            ) : (
              <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
            )}
            <Link className="btn back-to-products" to="/products">Back to Product List</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
