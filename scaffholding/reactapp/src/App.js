import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import NotesApp from './components/NotesApp';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="app-header">
          <h1>Notes App</h1>
        </header>
        
        <main className="main-content">
          <div className="app-section">
            <NotesApp />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;