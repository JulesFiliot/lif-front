import axios from 'axios';
import AppConfig from '../config/config';

const port = 3005;

export const login = (payload) => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/login`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const register = (payload) => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/register`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
