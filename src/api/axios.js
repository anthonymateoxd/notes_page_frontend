import axios from 'axios';

const host = import.meta.env.VITE_BACK_APP_HOST;
const port = import.meta.env.VITE_BACK_APP_PORT;

const api = axios.create({
  baseURL: `http://${host}:${port}/api`,
  withCredentials: true,
});

export default api;
