import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="product-list"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="product-list"><p>{error}</p></div>;
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-card">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <span className="product-price">${product.base_price}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
