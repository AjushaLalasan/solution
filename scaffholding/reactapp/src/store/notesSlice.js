import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: []
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        text: action.payload,
        important: false
      };
      state.notes.push(newNote);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    toggleImportant: (state, action) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.important = !note.important;
      }
    }
  }
});

export const { addNote, deleteNote, toggleImportant } = notesSlice.actions;
export default notesSlice.reducer;