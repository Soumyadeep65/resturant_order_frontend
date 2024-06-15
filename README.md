# Restaurant Order System

## Introduction

This is a simple restaurant order system built with React. It allows users to browse products, add them to a cart, and place orders. The project includes components for product listing, product details, and cart management.

## Installation

1. Clone the repository:

git clone https://github.com/your-username/resturant_order_frontend.git
cd restaurant-order-system

2. Install dependencies:
npm install

3. Running the Application
npm start

4. Running Tests
npm test

## Components
1) ProductList
File: src/components/ProductList/ProductList.jsx
Description: Displays a list of products.
2) ProductDetail
File: src/components/ProductDetail/ProductDetail.jsx
Description: Displays details of a selected product, including options and allows adding the product to the cart.
3) Cart
File: src/components/Cart/Cart.jsx
Description: Displays the items in the cart, allows updating quantities, and places the order.
4) API Service
File: src/services/api.js
Description: Contains functions to fetch products and product details from the API.
5) Context
File: src/context/CartContext.js
Description: Provides context for cart management including functions to add items to the cart, update quantities, and place orders.
