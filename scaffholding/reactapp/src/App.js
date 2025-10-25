import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MoviesApp from './components/MoviesApp';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="app-header">
          <h1>Favorite Movies App</h1>
        </header>
        
        <main className="main-content">
          <div className="app-section">
            <MoviesApp />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;