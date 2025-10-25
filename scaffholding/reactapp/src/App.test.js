import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import App from './App';
import MoviesApp from './components/MoviesApp';
import moviesReducer from './store/moviesSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      movies: moviesReducer
    }
  });
};

const renderWithProvider = (component, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Favorite Movies App', () => {
  test('renders app title', () => {
    renderWithProvider(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Favorite Movies App' })).toBeInTheDocument();
  });

  test('renders movies app component', () => {
    renderWithProvider(<App />);
    expect(screen.getByTestId('movie-input')).toBeInTheDocument();
  });

  test('displays no movies message initially', () => {
    renderWithProvider(<MoviesApp />);
    expect(screen.getByTestId('no-movies')).toHaveTextContent('No movies added yet');
  });

  test('displays input field and add button', () => {
    renderWithProvider(<MoviesApp />);
    expect(screen.getByTestId('movie-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-movie-btn')).toBeInTheDocument();
  });
});

describe('Movies Actions', () => {
  test('adds a movie', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.change(input, { target: { value: 'The Matrix' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.queryByTestId('no-movies')).not.toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('adds multiple movies', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Interstellar' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  test('does not add empty movie', () => {
    renderWithProvider(<MoviesApp />);
    
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('no-movies')).toBeInTheDocument();
  });

  test('toggles movie watched status', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.change(input, { target: { value: 'Avatar' } });
    fireEvent.click(addButton);
    
    const movieElement = screen.getByText('Avatar').closest('.movie-item');
    const toggleButton = movieElement.querySelector('[data-testid^="toggle-"]');
    
    expect(toggleButton).toHaveTextContent('Mark Watched');
    expect(movieElement).not.toHaveClass('watched');
    
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toHaveTextContent('Mark Unwatched');
    expect(movieElement).toHaveClass('watched');
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  test('removes a movie', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.change(input, { target: { value: 'Movie to remove' } });
    fireEvent.click(addButton);
    
    const removeButton = screen.getByText('Remove');
    
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('Movie to remove')).not.toBeInTheDocument();
    expect(screen.getByTestId('no-movies')).toBeInTheDocument();
  });

  test('handles form submission with enter key', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    
    fireEvent.change(input, { target: { value: 'Enter key movie' } });
    fireEvent.submit(input.closest('form'));
    
    expect(screen.getByText('Enter key movie')).toBeInTheDocument();
  });

  test('trims whitespace from movie titles', () => {
    renderWithProvider(<MoviesApp />);
    
    const input = screen.getByTestId('movie-input');
    const addButton = screen.getByTestId('add-movie-btn');
    
    fireEvent.change(input, { target: { value: '  Trimmed Movie  ' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Trimmed Movie')).toBeInTheDocument();
  });
});