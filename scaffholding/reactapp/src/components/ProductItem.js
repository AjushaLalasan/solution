import React from 'react';

const ProductItem = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="product-item" data-testid={`product-${product.id}`}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">{product.category}</p>
        <button 
          className="btn-primary"
          onClick={() => onAddToCart(product)}
          data-testid={`add-to-cart-${product.id}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;