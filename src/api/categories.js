import axios from 'axios';
import { config } from '../config/config';

const port = 3003;

// eslint-disable-next-line import/prefer-default-export
export const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrlApi}:${port}/categories`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
