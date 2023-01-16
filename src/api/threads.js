import axios from 'axios';
import AppConfig from '../config/config';

const port = 3004;

export const getThreadsFromSub = (subId, userId) => new Promise((resolve, reject) => {
  axios.get(`${AppConfig.baseUrlApi}:${port}/threads/${subId}/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const getAllThreads = () => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/threads`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const voteThread = (threadId, payload) => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/vote/${threadId}`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
