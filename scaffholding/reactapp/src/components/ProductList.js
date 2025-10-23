import React from 'react';

const ProductList = ({ products, searchKeyword }) => {
  if (products.length === 0 && !searchKeyword) {
    return (
      <div className="product-list-container">
        <h2>Product List</h2>
        <p className="no-products">No products added yet.</p>
      </div>
    );
  }

  if (products.length === 0 && searchKeyword) {
    return (
      <div className="product-list-container">
        <h2>Product List</h2>
        <p className="no-products">No products found for "{searchKeyword}".</p>
      </div>
    );
  }

  return (
    <div className="product-list-container" data-testid="product-list">
      <h2>Product List {searchKeyword && `(Search: "${searchKeyword}")`}</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" data-testid="product-item">
            <h3>{product.productName}</h3>
            <p className="price">${parseFloat(product.price).toFixed(2)}</p>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;