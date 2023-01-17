import axios from './index';
import appConfig from '../config/config';

const port = 3004;

export const getThreadsFromSub = (subId, userId) => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}:${port}/threads/${subId}/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const getAllThreads = () => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}:${port}/threads`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const voteThread = (threadId, payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}:${port}/vote/${threadId}`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const createThread = (payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}:${port}/thread`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
