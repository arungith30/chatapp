import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const register = (userId, deviceId, name, phone, password) => {
  return axios.post(`${API_URL}/register`, {
    userId,
    deviceId,
    name,
    phone,
    password
  });
};

const login = (userId, password) => {
  return axios.post(`${API_URL}/login`, { userId, password });
};

export default {
  register,
  login
};
