import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ProductDetail from './ProductDetail';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('ProductDetail', () => {
  const mockProduct = {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    base_price: 10,
    option_lists: [{ id: 1, name: 'Spicy Level', options: [{ id: 1, name: 'Mild' }] }],
  };

  const mockAddToCart = jest.fn();

  it('renders product details after fetching', async () => {
    api.getProductById.mockResolvedValueOnce(mockProduct);

    render(
      <BrowserRouter>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductDetail />
        </CartContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('displays error if option is not selected', async () => {
    api.getProductById.mockResolvedValueOnce(mockProduct);

    render(
      <BrowserRouter>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductDetail />
        </CartContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Add to Cart/i));

    expect(screen.getByText(/Please select an option from the Spicy Level/i)).toBeInTheDocument();
  });
});
