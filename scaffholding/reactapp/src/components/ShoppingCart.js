import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../store/cartSlice';

const ShoppingCart = () => {
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const sampleItems = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      
      <div className="cart-summary">
        <p>Total Items: <span data-testid="total-items">{totalItems}</span></p>
        <p>Total Price: <span data-testid="total-price">${totalPrice.toFixed(2)}</span></p>
      </div>

      <div className="available-items">
        <h3>Available Items</h3>
        {sampleItems.map(item => (
          <div key={item.id} className="item-card">
            <span>{item.name} - ${item.price}</span>
            <button 
              onClick={() => handleAddItem(item)}
              data-testid={`add-${item.id}`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-items">
        <h3>Cart Items</h3>
        {items.length === 0 ? (
          <p data-testid="empty-cart">Cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`}>
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button 
                onClick={() => handleRemoveItem(item.id)}
                data-testid={`remove-${item.id}`}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <button 
          onClick={handleClearCart}
          className="clear-cart-btn"
          data-testid="clear-cart"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;