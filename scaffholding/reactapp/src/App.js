import React from 'react';
import ClassClock from './components/ClassClock';
import FunctionalClock from './components/FunctionalClock';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Clock App</h1>
        <p className="subtitle">React Lifecycle & Hooks Demo</p>
      </header>
      
      <main className="main-content">
        <div className="components-grid">
          <div className="component-card">
            <ClassClock />
          </div>
          
          <div className="component-card">
            <FunctionalClock />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;