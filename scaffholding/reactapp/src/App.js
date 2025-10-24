import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="app-header">
          <h1>Shopping Cart App</h1>
        </header>
        
        <main className="main-content">
          <ShoppingCart />
        </main>
      </div>
    </Provider>
  );
}

export default App;