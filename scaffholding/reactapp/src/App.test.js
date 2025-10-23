import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock alert
global.alert = jest.fn();

describe('Product Entry and Search System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product entry and search forms', () => {
    render(<App />);
    
    expect(screen.getByText('Product Entry Form (Controlled)')).toBeInTheDocument();
    expect(screen.getByText('Search Form (Uncontrolled)')).toBeInTheDocument();
    expect(screen.getByText('Product List')).toBeInTheDocument();
  });

  describe('Product Entry Form - Controlled Components', () => {
    test('updates input values when typing', () => {
      render(<App />);
      
      const nameInput = screen.getByTestId('product-name-input');
      const priceInput = screen.getByTestId('price-input');
      const categorySelect = screen.getByTestId('category-select');
      const descriptionTextarea = screen.getByTestId('description-textarea');
      
      fireEvent.change(nameInput, { target: { value: 'Test Product' } });
      fireEvent.change(priceInput, { target: { value: '29.99' } });
      fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
      fireEvent.change(descriptionTextarea, { target: { value: 'This is a test product description' } });
      
      expect(nameInput.value).toBe('Test Product');
      expect(priceInput.value).toBe('29.99');
      expect(categorySelect.value).toBe('Electronics');
      expect(descriptionTextarea.value).toBe('This is a test product description');
    });

    test('shows validation errors for empty required fields', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Product name is required')).toBeInTheDocument();
        expect(screen.getByText('Price is required')).toBeInTheDocument();
        expect(screen.getByText('Category is required')).toBeInTheDocument();
        expect(screen.getByText('Description should have at least 10 characters')).toBeInTheDocument();
      });
    });

    test('shows validation error for invalid price', async () => {
      render(<App />);
      
      const priceInput = screen.getByTestId('price-input');
      fireEvent.change(priceInput, { target: { value: '-10' } });
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Price must be a positive number')).toBeInTheDocument();
      });
    });

    test('shows validation errors when clicking add button with invalid form', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Product name is required')).toBeInTheDocument();
        expect(screen.getByText('Price is required')).toBeInTheDocument();
        expect(screen.getByText('Category is required')).toBeInTheDocument();
        expect(screen.getByText('Description should have at least 10 characters')).toBeInTheDocument();
      });
    });

    test('submits form when all fields are valid', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Test Product' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '29.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'This is a valid product description' } });
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Product added successfully!');
      });
    });

    test('adds product successfully with valid data', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Test Product' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '29.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'This is a valid product description' } });
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Product added successfully!');
      });
    });

    test('clears errors when user starts typing', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Product name is required')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByTestId('product-name-input');
      fireEvent.change(nameInput, { target: { value: 'T' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Product name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Search Form - Uncontrolled Components', () => {
    test('performs search with keyword', async () => {
      render(<App />);
      
      // First add a product
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Laptop' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '999.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'High performance laptop' } });
      fireEvent.click(screen.getByTestId('add-product-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Laptop')).toBeInTheDocument();
      });
      
      // Now search
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Laptop' } });
      
      await waitFor(() => {
        expect(screen.getByText('Product List (Search: "Laptop")')).toBeInTheDocument();
      });
    });

    test('shows no results message when search finds nothing', async () => {
      render(<App />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
      
      await waitFor(() => {
        expect(screen.getByText('No products found for "NonExistent".')).toBeInTheDocument();
      });
    });
  });

  describe('Product List Component', () => {
    test('displays no products message initially', () => {
      render(<App />);
      
      expect(screen.getByText('No products added yet.')).toBeInTheDocument();
    });

    test('displays added products', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Test Product' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '29.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'This is a test product' } });
      
      fireEvent.click(screen.getByTestId('add-product-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$29.99')).toBeInTheDocument();
        expect(screen.getAllByText('Electronics')[1]).toBeInTheDocument();
        expect(screen.getByText('This is a test product')).toBeInTheDocument();
      });
    });

    test('filters products by search keyword', async () => {
      render(<App />);
      
      // Add first product
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Laptop' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '999.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'High performance laptop' } });
      fireEvent.click(screen.getByTestId('add-product-button'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Product added successfully!');
      });
      
      // Add second product
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Phone' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '599.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'Smartphone with great camera' } });
      fireEvent.click(screen.getByTestId('add-product-button'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Product added successfully!');
      });
      
      // Search for laptop
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Laptop' } });
      
      await waitFor(() => {
        expect(screen.getByText('Laptop')).toBeInTheDocument();
        expect(screen.queryByText('Phone')).not.toBeInTheDocument();
      });
    });
  });

  describe('Integration Tests', () => {
    test('complete workflow: add product, search, and display results', async () => {
      render(<App />);
      
      // Add a product
      fireEvent.change(screen.getByTestId('product-name-input'), { target: { value: 'Gaming Mouse' } });
      fireEvent.change(screen.getByTestId('price-input'), { target: { value: '49.99' } });
      fireEvent.change(screen.getByTestId('category-select'), { target: { value: 'Electronics' } });
      fireEvent.change(screen.getByTestId('description-textarea'), { target: { value: 'High precision gaming mouse with RGB lighting' } });
      
      const submitButton = screen.getByTestId('add-product-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Product added successfully!');
      });
      
      // Verify product appears in list
      await waitFor(() => {
        expect(screen.getByText('Gaming Mouse')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
      });
      
      // Search for the product
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Gaming' } });
      
      await waitFor(() => {
        expect(screen.getByText('Product List (Search: "Gaming")')).toBeInTheDocument();
        expect(screen.getByText('Gaming Mouse')).toBeInTheDocument();
      });
      
      // Search for non-existent product
      fireEvent.change(searchInput, { target: { value: 'Keyboard' } });
      
      await waitFor(() => {
        expect(screen.getByText('No products found for "Keyboard".')).toBeInTheDocument();
      });
    });
  });
});