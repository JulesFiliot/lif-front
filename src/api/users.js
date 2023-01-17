import axios from './index';
import appConfig from '../config/config';

const port = 3001;

// eslint-disable-next-line import/prefer-default-export
export const getUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}:${port}/user/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
