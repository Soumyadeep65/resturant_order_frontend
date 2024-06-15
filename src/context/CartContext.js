import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (cartId) {
          const { items } = await api.getCartById(cartId);
          setCartItems(items);
          const total = await api.calculateTotalPrice(cartId);
          setTotalPrice(total.total_price);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [cartId]);

  const initializeNewCart = () => {
    const newCartId = Date.now(); // Or another method to generate unique cart IDs
    setCartId(newCartId);
    setCartItems([]);
    setTotalPrice(0);
    // Store cartId in local storage
    localStorage.setItem('cartId', newCartId.toString());
  };

  const addToCart = useCallback(async (productId, options, quantity) => {
    try {
      const { items } = await api.addToCart(productId, options, quantity, cartId);
      setCartItems(items);
      const total = await api.calculateTotalPrice(cartId);
      setTotalPrice(total.total_price);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [cartId]);

  const updateQuantity = useCallback(async (cartItemId, newQuantity,cartId) => {
    try {
      const { items } = await api.updateCartItemQuantity(cartItemId, newQuantity);
      setCartItems(items);
      const total = await api.calculateTotalPrice(cartId);
      setTotalPrice(total.total_price);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, []);

  const getCartById = useCallback(async (id) => {
    try {
      const { items } = await api.getCartById(id);
      setCartItems(items);
      const total = await api.calculateTotalPrice(id);
      setTotalPrice(total.total_price);
    } catch (error) {
      console.error('Error fetching cart by ID:', error);
    }
  }, []);

  const placeOrder = async (cartId,totalPrice, tax, serviceFee, tip, paymentMethod) => {
    try {
      await api.placeOrder(cartId, totalPrice, tax, serviceFee, tip, paymentMethod);
      // After placing order, initialize a new cart
      initializeNewCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        cartId,
        addToCart,
        updateQuantity,
        getCartById,
        placeOrder,
        initializeNewCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
