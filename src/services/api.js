import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Function to handle errors from Axios requests
const handleErrors = (error) => {
  console.error('API Error:', error);
  throw error;
};

// API functions    
const api = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Get product details by ID
  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}/`);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Add product to cart
  addToCart: async (productId, options, quantity, cartId) => {
    try {
      const response = await axios.post(`${API_URL}/cart/add/`, {
        product_id: productId,
        options,
        quantity,
        cart_id: cartId
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/cart/update_quantity/`, {
        cart_item_id: cartItemId,
        quantity,
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Get cart details by cart ID
  getCartById: async (cartId) => {
    try {
      const response = await axios.get(`${API_URL}/cart/get_cart_by_id/`, {
        params: { cart_id: cartId }
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Get cart details
  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/`);
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Calculate total price
  calculateTotalPrice: async (cartId) => {
    try {
      const response = await axios.post(`${API_URL}/cart/calculate_total/`, {
        cart_id: cartId,
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Place order
  placeOrder: async (cartId, totalPrice, tax, serviceFee, tip, paymentMethod) => {
    try {
      const response = await axios.post(`${API_URL}/orders/place_order/`, {
        cart_id: cartId,
        total_price: totalPrice,
        tax,
        service_fee: serviceFee,
        tip,
        payment_method: paymentMethod,
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  // Other API calls can be added similarly
};

export default api;
