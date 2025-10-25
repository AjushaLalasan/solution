import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, toggleImportant } from '../store/notesSlice';

const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const notes = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

  const handleAddNote = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      dispatch(addNote(noteText.trim()));
      setNoteText('');
    }
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  return (
    <div className="notes-app">
      <h2>My Notes</h2>
      
      <form onSubmit={handleAddNote} className="add-note-form">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter a note..."
          className="note-input"
          data-testid="note-input"
        />
        <button type="submit" className="add-btn" data-testid="add-note-btn">
          Add Note
        </button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes" data-testid="no-notes">No notes available</p>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              className={`note-item ${note.important ? 'important' : ''}`}
              data-testid={`note-${note.id}`}
            >
              <span className="note-text" data-testid={`note-text-${note.id}`}>
                {note.text}
              </span>
              {note.important && (
                <span className="important-indicator" data-testid={`important-indicator-${note.id}`}>
                  ⭐
                </span>
              )}
              <div className="note-actions">
                <button
                  onClick={() => handleToggleImportant(note.id)}
                  className={`toggle-btn ${note.important ? 'unmark' : 'mark'}`}
                  data-testid={`toggle-${note.id}`}
                >
                  {note.important ? 'Unmark' : 'Mark Important'}
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="delete-btn"
                  data-testid={`delete-${note.id}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;