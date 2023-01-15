import axios from 'axios';
import AppConfig from '../config/config';

const port = 3004;

export const getThreadsFromSub = (subId) => new Promise((resolve, reject) => {
  axios.get(`${AppConfig.baseUrlApi}:${port}/threads/${subId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const getAllThreads = () => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/threads`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
