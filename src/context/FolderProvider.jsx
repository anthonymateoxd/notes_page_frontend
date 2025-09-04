import { createContext, useContext, useState } from 'react';
import {
  createFolderRequest,
  deleteFolderByIdRequest,
  getAllFoldersRequest,
  getFolderByIdRequest,
  updateFolderRequest,
} from '../api/api';

const FolderContext = createContext();

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('UseFolder must be used within a FolderProvider');
  }
  return context;
};

export function FolderProvider({ children }) {
  const [folder_Id, setFolder_Id] = useState('');
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // FolderProvider.jsx
  const updateFolder = async (folderId, folderData) => {
    try {
      const res = await updateFolderRequest(folderId, folderData);
      return res;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  const getFolders = async () => {
    try {
      const res = await getAllFoldersRequest();
      setFolders(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.resposne.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  const getFolderById = async folderId => {
    try {
      const res = await getFolderByIdRequest(folderId);
      setFolder(res.data[0]);
      setLoading(false);
      console.log('Info:', res.data[0].id);
      setFolderId(res.data[0].id);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.resposne.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  const deleteFolderById = async folderId => {
    try {
      const res = await deleteFolderByIdRequest(folderId);
      setFolder(res.data);
      console.log(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.resposne.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  const createFolder = async folderData => {
    try {
      const res = await createFolderRequest(folderData);
      console.log(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.resposne.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folder_Id,
        loading,
        folders,
        errors,
        folder,
        setFolder,
        getFolders,
        updateFolder,
        setFolder_Id,
        createFolder,
        getFolderById,
        deleteFolderById,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}
