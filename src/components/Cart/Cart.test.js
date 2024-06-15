import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Cart from './Cart';

// Mock the CartContext functions
const mockGetCartById = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockPlaceOrder = jest.fn();

const mockCartItems = [
  { id: 1, product: { name: 'Product 1', base_price: 10 }, quantity: 1 },
  { id: 2, product: { name: 'Product 2', base_price: 20 }, quantity: 2 },
];

describe('Cart', () => {
  beforeEach(() => {
    mockGetCartById.mockResolvedValue();
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ getCartById: mockGetCartById }}>
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders cart items after fetching', async () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartItems: mockCartItems,
            totalPrice: 50,
            getCartById: mockGetCartById,
            updateQuantity: mockUpdateQuantity,
            placeOrder: mockPlaceOrder,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: \$50.00/i)).toBeInTheDocument();
  });

  it('updates quantity and fetches updated cart', async () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartItems: mockCartItems,
            totalPrice: 50,
            getCartById: mockGetCartById,
            updateQuantity: mockUpdateQuantity,
            placeOrder: mockPlaceOrder,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

    fireEvent.click(screen.getAllByText('+')[0]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2, undefined);
  });
});
