import axios from './index';
import appConfig from '../config/config';

const port = '/auth';

export const login = (payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}${port}/login`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const register = (payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}${port}/register`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
