import React from 'react';
import './QuantitySelector.css';

const QuantitySelector = ({ item, updateQuantity }) => {
  return (
    <div className="quantity-selector">
      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
      {item.quantity}
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
    </div>
  );
};

export default QuantitySelector;
