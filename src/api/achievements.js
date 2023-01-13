import axios from 'axios';
import AppConfig from '../config/config';

const port = 3002;

export const getSubsFormCategory = (subId, userId) => new Promise((resolve, reject) => {
  axios.get(`${AppConfig.baseUrlApi}:${port}/subcat-achievements/${subId}/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const claimAchievement = (payload) => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/user-achievement`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const removeAchievement = (payload) => new Promise((resolve, reject) => {
  axios.post(`${AppConfig.baseUrlApi}:${port}/remove-user-achievement`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
