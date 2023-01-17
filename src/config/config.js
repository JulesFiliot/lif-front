import axios from 'axios';

export const config = {
  baseUrlApi: process.env.REACT_APP_BASEURL_API,
};

export const setAxiosHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    axios.defaults.headers.common['x-access-token'] = null;
  }
};
