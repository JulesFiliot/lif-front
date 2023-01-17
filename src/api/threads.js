import axios from 'axios';
import { config } from '../config/config';

const port = 3004;

// todo add userId to url
export const getThreadsFromSub = (subId) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrlApi}:${port}/threads/${subId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const getAllThreads = () => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrlApi}:${port}/threads`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const voteThread = (threadId, payload) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrlApi}:${port}/vote/${threadId}`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
