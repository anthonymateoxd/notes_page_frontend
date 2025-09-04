import { createContext, useContext, useEffect, useState } from 'react';
import {
  addRequestUser,
  editUserRequest,
  getAllFoldersAndNotesRequest,
  getAllInformationByIdRequest,
  postLogin,
  verifyTokenRequest,
} from '../api/api';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth Must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [allFoldersAndNotes, setAllFoldersAndNotes] = useState('');
  const [allBoutUser, setAllAboutUser] = useState('');
  const [isAuthenticated, setIsAuhenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState('');

  const aggUserRequest = async user => {
    try {
      const result = await addRequestUser(user);
      setUser(result.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
    }
  };

  const loginRequest = async user => {
    try {
      const result = await postLogin(user);
      setUser(result.data);
      return true;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      return false;
    }
  };

  const getAllFoldersAndNotes = async () => {
    try {
      const result = await getAllFoldersAndNotesRequest();
      setAllFoldersAndNotes(result.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      console.error(error);
      return false;
    }
  };

  const getAllInformationById = async () => {
    try {
      const res = await getAllInformationByIdRequest();
      setAllAboutUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors([error.response.data[0]]);
      } else if (typeof error.response.data === 'string') {
        setErrors([error.response.data]);
      } else if (error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Error']);
      }
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function CheckLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuhenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuhenticated(false);
          setLoading(false);
          return;
        }
        setIsAuhenticated(true);
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        setIsAuhenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    CheckLogin();
  }, []);

  const editUser = async userData => {
    try {
      const res = await editUserRequest(userData);
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        allFoldersAndNotes,
        isAuthenticated,
        allBoutUser,
        userData,
        loading,
        errors,
        user,
        editUser,
        loginRequest,
        aggUserRequest,
        getAllFoldersAndNotes,
        getAllInformationById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
