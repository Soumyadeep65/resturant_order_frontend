// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CartProvider from './context/CartContext';

const render = () => {
  return ReactDOM.render(<CartProvider><App /></CartProvider>, document.getElementById("root"));
};
render();
