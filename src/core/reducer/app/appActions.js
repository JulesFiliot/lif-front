export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SUB = 'SET_SUB';

export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload,
});

export const setSub = (payload) => ({
  type: SET_SUB,
  payload,
});
