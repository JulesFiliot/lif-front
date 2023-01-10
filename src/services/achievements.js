import axios from 'axios';
import AppConfig from '../config/config';

const port = 3002;
// ? /subcat-achievements/:subcat_id/:user_id
// eslint-disable-next-line import/prefer-default-export
export const getSubsFormCategory = (subId, userId) => new Promise((resolve, reject) => {
  axios.get(`${AppConfig.baseUrlApi}:${port}/subcat-achievements/${subId}/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
