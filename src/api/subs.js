import axios from './index';
import appConfig from '../config/config';

const port = '/category';

// eslint-disable-next-line import/prefer-default-export
export const getSubsFormCategory = (catId) => new Promise((resolve, reject) => {
  axios.get(`${appConfig.baseUrlApi}${port}/subcategories/${catId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
