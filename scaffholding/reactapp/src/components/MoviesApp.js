import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMovie, removeMovie, toggleWatched } from '../store/moviesSlice';

const MoviesApp = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const movies = useSelector(state => state.movies.movies);
  const dispatch = useDispatch();

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (movieTitle.trim()) {
      dispatch(addMovie(movieTitle.trim()));
      setMovieTitle('');
    }
  };

  const handleRemoveMovie = (id) => {
    dispatch(removeMovie(id));
  };

  const handleToggleWatched = (id) => {
    dispatch(toggleWatched(id));
  };

  return (
    <div className="movies-app">
      <h2>Favorite Movies</h2>
      
      <form onSubmit={handleAddMovie} className="add-movie-form">
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title..."
          className="movie-input"
          data-testid="movie-input"
        />
        <button type="submit" className="add-btn" data-testid="add-movie-btn">
          Add Movie
        </button>
      </form>

      <div className="movies-list">
        {movies.length === 0 ? (
          <p className="no-movies" data-testid="no-movies">No movies added yet</p>
        ) : (
          movies.map(movie => (
            <div 
              key={movie.id} 
              className={`movie-item ${movie.watched ? 'watched' : ''}`}
              data-testid={`movie-${movie.id}`}
            >
              <span className="movie-title" data-testid={`movie-title-${movie.id}`}>
                {movie.title}
              </span>
              {movie.watched && (
                <span className="watched-indicator" data-testid={`watched-indicator-${movie.id}`}>
                  ✓
                </span>
              )}
              <div className="movie-actions">
                <button
                  onClick={() => handleToggleWatched(movie.id)}
                  className={`toggle-btn ${movie.watched ? 'unwatch' : 'watch'}`}
                  data-testid={`toggle-${movie.id}`}
                >
                  {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
                </button>
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="remove-btn"
                  data-testid={`remove-${movie.id}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesApp;