import { createContext, useContext, useState } from 'react';
import {
  editNoteRequest,
  getAllNotesRequest,
  postNoteRequest,
} from '../api/notes.request';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('NotesContext must be used within a NotesProvider');
  }
  return context;
};

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState('');
  const [editedNote, setEditedNote] = useState('');

  const getAllNotes = async folderId => {
    try {
      const res = await getAllNotesRequest(folderId);
      setNotes(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postNote = async (folderId, folderData) => {
    try {
      const res = await postNoteRequest(folderId, folderData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (folderId, folderData) => {
    try {
      const res = await editNoteRequest(folderId, folderData);
      setEditedNote(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, editedNote, editNote, postNote, getAllNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
}
