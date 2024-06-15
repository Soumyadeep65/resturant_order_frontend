import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './LandingPage.css';  // Import the CSS file

const LandingPage = () => {
  const history = useNavigate();
  const { initializeNewCart } = useContext(CartContext);

  const handleStartNewOrder = () => {
    initializeNewCart();
    history('/products');
  };

  const handleContinueExistingOrder = (orderId) => {
    const orderIdInt = parseInt(orderId, 10);
    if (!isNaN(orderIdInt)) {
      history(`/cart/${orderIdInt}`);
    } else {
      alert('Please enter a valid order ID.');
    }
  };

  return (
    <div className="landing-page">
      <h1 className="title">Welcome to the Restaurant Order System</h1>
      <div className="new-order">
        <h2>New Order</h2>
        <button className="btn start-order-btn" onClick={handleStartNewOrder}>Start a New Order</button>
      </div>
      <div className="existing-order">
        <h2>Existing Order</h2>
        <p>Enter your cart ID to continue with an existing order:</p>
        <input type="text" placeholder="Enter cart ID" id="orderIdInput" className="input" />
        <button className="btn continue-order-btn" onClick={() => handleContinueExistingOrder(document.getElementById('orderIdInput').value)}>Continue</button>
      </div>
    </div>
  );
};

export default LandingPage;
