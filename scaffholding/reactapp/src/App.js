import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import './App.css';

const Destinations = React.lazy(() => import('./components/Destinations'));
const Booking = React.lazy(() => import('./components/Booking'));

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;