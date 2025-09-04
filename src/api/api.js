import api from './axios.js';

export const addRequestUser = user => api.post('/user', user);

export const postLogin = user => api.post('/login', user);

export const editUserRequest = userData => api.post('/updated-user', userData);

export const verifyTokenRequest = () => api.get('/verify');

export const getAllFoldersRequest = () => api.get('/get-folders');

export const getAllInformationByIdRequest = () => api.get('/user');

export const getAllFoldersAndNotesRequest = () =>
  api.get('/get-folder-and-notes');

export const updateFolderRequest = (folderId, folderData) =>
  api.post(`/edit-folders/${folderId}`, folderData);

export const getFolderByIdRequest = folderId =>
  api.get(`/get-folder/${folderId}`);

export const deleteFolderByIdRequest = folderId =>
  api.post(`/delete-folder/${folderId}`);

export const createFolderRequest = folderData =>
  api.post('/create-folder', folderData);
