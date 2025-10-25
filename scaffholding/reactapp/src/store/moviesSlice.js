import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: []
  },
  reducers: {
    addMovie: (state, action) => {
      const newMovie = {
        id: Date.now(),
        title: action.payload,
        watched: false
      };
      state.movies.push(newMovie);
    },
    removeMovie: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    toggleWatched: (state, action) => {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    }
  }
});

export const { addMovie, removeMovie, toggleWatched } = moviesSlice.actions;
export default moviesSlice.reducer;