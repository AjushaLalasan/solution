import React from 'react';
import ClassClock from './components/ClassClock';
import FunctionalClock from './components/FunctionalClock';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Multi-Time Zone Clock</h1>
      <div className="clock-layout">
        <ClassClock />
        <FunctionalClock />
      </div>
    </div>
  );
}

export default App;