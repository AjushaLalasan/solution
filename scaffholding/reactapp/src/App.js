import React, { useState } from 'react';
import ClassGreeting from './components/ClassGreeting';
import FunctionalGreeting from './components/FunctionalGreeting';
import './App.css';

function App() {
  const [showClassGreeting, setShowClassGreeting] = useState(true);
  const [showFuncGreeting, setShowFuncGreeting] = useState(true);

  const resetClassGreeting = () => setShowClassGreeting(false);
  const resetFuncGreeting = () => setShowFuncGreeting(false);

  const handleResetClass = () => {
    setShowClassGreeting(false);
    setTimeout(() => setShowClassGreeting(true), 100);
  };

  const handleResetFunc = () => {
    setShowFuncGreeting(false);
    setTimeout(() => setShowFuncGreeting(true), 100);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Countdown Greeting Message</h1>
        <p className="subtitle">React Lifecycle & Hooks Demo</p>
      </header>
      
      <main className="main-content">
        <div className="components-grid">
          <div className="component-card">
            <div className="card-header">
              <h3>Class Component</h3>
              <span className="badge">componentDidMount/Unmount</span>
            </div>
            <div className="card-body">
              {showClassGreeting ? (
                <ClassGreeting onTimeout={resetClassGreeting} />
              ) : (
                <div className="timeout-state">
                  <p className="timeout-message">Component Unmounted!</p>
                  <button onClick={handleResetClass} className="reset-btn" data-testid="reset-class-btn">
                    Restart Component
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="component-card">
            <div className="card-header">
              <h3>Functional Component</h3>
              <span className="badge">useEffect Hook</span>
            </div>
            <div className="card-body">
              {showFuncGreeting ? (
                <FunctionalGreeting onTimeout={resetFuncGreeting} />
              ) : (
                <div className="timeout-state">
                  <p className="timeout-message">Component Unmounted!</p>
                  <button onClick={handleResetFunc} className="reset-btn" data-testid="reset-func-btn">
                    Restart Component
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Open console to see mount/unmount logs</p>
      </footer>
    </div>
  );
}

export default App;