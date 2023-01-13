import axios from 'axios';
import AppConfig from '../config/config';

const port = 3003;

// eslint-disable-next-line import/prefer-default-export
export const getSubsFormCategory = (catId) => new Promise((resolve, reject) => {
  axios.get(`${AppConfig.baseUrlApi}:${port}/subcategories/${catId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
