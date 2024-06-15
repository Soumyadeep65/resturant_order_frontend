import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', description: 'Description 1', base_price: 10 },
    { id: 2, name: 'Product 2', description: 'Description 2', base_price: 20 },
  ];

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders products after fetching', async () => {
    api.getProducts.mockResolvedValueOnce(mockProducts);

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    await screen.findByText('Product 1');
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    api.getProducts.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    await screen.findByText(/Error fetching products/i);
  });
});
