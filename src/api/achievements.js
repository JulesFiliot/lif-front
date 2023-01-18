import axios from './index';
import appConfig from '../config/config';

const port = '/achievement';

export const getSubsFormCategory = (subId, userId) => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}${port}/subcat-achievements/${subId}/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const getUserAchievements = (userId) => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}${port}/user-achievements/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const claimAchievement = (payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}${port}/user-achievement`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const removeAchievement = (payload) => new Promise((resolve, reject) => {
  axios.post(`${appConfig.baseUrlApi}${port}/remove-user-achievement`, payload)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
