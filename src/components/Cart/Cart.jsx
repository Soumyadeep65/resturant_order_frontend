import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartId } = useParams();
  const { cartItems, totalPrice, updateQuantity, getCartById, placeOrder } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCartById(cartId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (cartId) {
      fetchCart();
    }
  }, [cartId, getCartById]); // Ensure fetchCart is only called when cartId or getCartById changes

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(cartId, totalPrice, totalPrice * 0.1, totalPrice * 0.05, tip, 'credit card');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity, cartId) => {
    try {
      await updateQuantity(itemId, newQuantity, cartId);
      // Fetch updated cart after updating quantity
      if (cartId) {
        await getCartById(cartId);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems && cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <span>{item.product.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, cartId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, cartId)}>+</button>
                </div>
                <span>${item.product.base_price}</span>
              </div>
            </div>
          ))}
          <div className="price-breakup">
            <div className="price-detail">Price: ${(totalPrice - totalPrice * 0.1 - totalPrice * 0.05).toFixed(2)}</div>
            <div className="price-detail">Tax: ${(totalPrice * 0.1).toFixed(2)}</div>
            <div className="price-detail">Service Fee: ${(totalPrice * 0.05).toFixed(2)}</div>
            <div className="price-detail total">Total: ${totalPrice.toFixed(2)}</div>
          </div>
          <div className="tip-selector">
            <label htmlFor="tip">Tip:</label>
            <input
              type="number"
              id="tip"
              value={tip}
              onChange={(e) => setTip(Number(e.target.value))}
              min="0"
            />
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
      <Link className="back-to-products" to="/products">Back to Product List</Link>
    </div>
  );
};

export default Cart;
