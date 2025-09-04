import api from './axios.js';

export const getAllNotesRequest = folderId => api.get(`/get-notes/${folderId}`);

export const postNoteRequest = (folderId, folderData) =>
  api.post(`/post-notes/${folderId}`, folderData);

export const editNoteRequest = (folderId, folderData) =>
  api.post(`/edit-note/${folderId}`, folderData);
