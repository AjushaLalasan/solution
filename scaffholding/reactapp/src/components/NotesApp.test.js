import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import NotesApp from './NotesApp';
import notesReducer from '../store/notesSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      notes: notesReducer
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

describe('NotesApp', () => {
  test('renders notes app title', () => {
    renderWithProvider(<NotesApp />);
    expect(screen.getByText('My Notes')).toBeInTheDocument();
  });

  test('displays no notes message initially', () => {
    renderWithProvider(<NotesApp />);
    expect(screen.getByTestId('no-notes')).toHaveTextContent('No notes available');
  });

  test('displays input field and add button', () => {
    renderWithProvider(<NotesApp />);
    expect(screen.getByTestId('note-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-note-btn')).toBeInTheDocument();
  });
});

describe('Notes Actions', () => {
  test('adds a note', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.change(input, { target: { value: 'Test note' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test note')).toBeInTheDocument();
    expect(screen.queryByTestId('no-notes')).not.toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('adds multiple notes', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.change(input, { target: { value: 'First note' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Second note' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('First note')).toBeInTheDocument();
    expect(screen.getByText('Second note')).toBeInTheDocument();
  });

  test('does not add empty note', () => {
    renderWithProvider(<NotesApp />);
    
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('no-notes')).toBeInTheDocument();
  });

  test('trims whitespace from notes', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.change(input, { target: { value: '  Test note  ' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test note')).toBeInTheDocument();
  });

  test('toggles note importance', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.change(input, { target: { value: 'Important note' } });
    fireEvent.click(addButton);
    
    const noteElement = screen.getByText('Important note').closest('.note-item');
    const toggleButton = noteElement.querySelector('[data-testid^="toggle-"]');
    
    expect(toggleButton).toHaveTextContent('Mark Important');
    expect(noteElement).not.toHaveClass('important');
    
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toHaveTextContent('Unmark');
    expect(noteElement).toHaveClass('important');
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  test('deletes a note', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    const addButton = screen.getByTestId('add-note-btn');
    
    fireEvent.change(input, { target: { value: 'Note to delete' } });
    fireEvent.click(addButton);
    
    const deleteButton = screen.getByText('Delete');
    
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Note to delete')).not.toBeInTheDocument();
    expect(screen.getByTestId('no-notes')).toBeInTheDocument();
  });

  test('handles form submission with enter key', () => {
    renderWithProvider(<NotesApp />);
    
    const input = screen.getByTestId('note-input');
    
    fireEvent.change(input, { target: { value: 'Enter key note' } });
    fireEvent.submit(input.closest('form'));
    
    expect(screen.getByText('Enter key note')).toBeInTheDocument();
  });
});