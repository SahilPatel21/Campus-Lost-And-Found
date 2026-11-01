// services/authService.js
import api from './api';

const register = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data; // { success, message, token, user }
};

const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data; // { success, message, token, user }
};

const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};

export default {
  register,
  login,
  getMe,
};
