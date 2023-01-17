/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from '../core/store';

axios.interceptors.request.use((config) => {
  const { token } = store.getState().userReducer;
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default axios;
