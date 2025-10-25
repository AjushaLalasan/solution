import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Sample Product', price: 29.99, quantity: 2 },
    { id: 2, title: 'Another Product', price: 19.99, quantity: 1 }
  ]);

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart" data-testid="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`}>
                <h3>{item.title}</h3>
                <p className="item-price">${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  data-testid={`remove-${item.id}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${getTotalPrice()}</h3>
            <button className="btn-primary checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;