import React, { useState } from 'react';

const ProductEntryForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.description.length < 10) {
      newErrors.description = 'Description should have at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddProduct(formData);
      setFormData({
        productName: '',
        price: '',
        category: '',
        description: ''
      });
      alert('Product added successfully!');
    }
  };

  const handleButtonClick = (e) => {
    if (!isFormValid()) {
      e.preventDefault();
      validateForm();
    }
  };

  const isFormValid = () => {
    return formData.productName.trim() &&
           formData.price &&
           !isNaN(formData.price) &&
           parseFloat(formData.price) > 0 &&
           formData.category.trim() &&
           formData.description.length >= 10;
  };

  return (
    <div className="form-container">
      <h2>Product Entry Form (Controlled)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            data-testid="product-name-input"
          />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </div>

        <div className="field">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            data-testid="price-input"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="field">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            data-testid="category-select"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="field">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            data-testid="description-textarea"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <button 
          type="submit" 
          onClick={handleButtonClick}
          data-testid="add-product-button"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductEntryForm;