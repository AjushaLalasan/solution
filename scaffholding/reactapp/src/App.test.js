import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import App from './App';
import ShoppingCart from './components/ShoppingCart';
import cartReducer from './store/cartSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    }
  });
};

const renderWithProvider = (component, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Shopping Cart App', () => {
  test('renders shopping cart app title', () => {
    renderWithProvider(<App />);
    expect(screen.getByText('Shopping Cart App')).toBeInTheDocument();
  });

  test('displays initial empty cart state', () => {
    renderWithProvider(<ShoppingCart />);
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$0.00');
    expect(screen.getByTestId('empty-cart')).toHaveTextContent('Cart is empty');
  });

  test('displays available items', () => {
    renderWithProvider(<ShoppingCart />);
    expect(screen.getByText('Laptop - $999')).toBeInTheDocument();
    expect(screen.getByText('Phone - $599')).toBeInTheDocument();
    expect(screen.getByText('Headphones - $199')).toBeInTheDocument();
  });
});

describe('Shopping Cart Actions', () => {
  test('adds item to cart', () => {
    renderWithProvider(<ShoppingCart />);
    
    fireEvent.click(screen.getByTestId('add-1'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$999.00');
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
  });

  test('adds multiple items to cart', () => {
    renderWithProvider(<ShoppingCart />);
    
    fireEvent.click(screen.getByTestId('add-1'));
    fireEvent.click(screen.getByTestId('add-2'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$1598.00');
  });

  test('increases quantity when adding same item', () => {
    renderWithProvider(<ShoppingCart />);
    
    fireEvent.click(screen.getByTestId('add-1'));
    fireEvent.click(screen.getByTestId('add-1'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$1998.00');
    expect(screen.getByText('Laptop - $999 x 2')).toBeInTheDocument();
  });

  test('removes item from cart', () => {
    renderWithProvider(<ShoppingCart />);
    
    fireEvent.click(screen.getByTestId('add-1'));
    fireEvent.click(screen.getByTestId('remove-1'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$0.00');
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
  });

  test('clears entire cart', () => {
    renderWithProvider(<ShoppingCart />);
    
    fireEvent.click(screen.getByTestId('add-1'));
    fireEvent.click(screen.getByTestId('add-2'));
    fireEvent.click(screen.getByTestId('clear-cart'));
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('$0.00');
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
  });

  test('clear cart button only shows when cart has items', () => {
    renderWithProvider(<ShoppingCart />);
    
    expect(screen.queryByTestId('clear-cart')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('add-1'));
    
    expect(screen.getByTestId('clear-cart')).toBeInTheDocument();
  });
});