import React, { useState } from 'react';
import ProductEntryForm from './components/ProductEntryForm';
import SearchForm from './components/SearchForm';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    product.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    product.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Product Entry and Search System</h1>
      
      <div className="app-layout">
        <div className="left-panel">
          <ProductEntryForm onAddProduct={addProduct} />
        </div>
        
        <div className="right-panel">
          <SearchForm onSearch={setSearchKeyword} />
          <ProductList products={filteredProducts} searchKeyword={searchKeyword} />
        </div>
      </div>
    </div>
  );
}

export default App;