export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
export const logout = () => {
  console.log('logging out');
  return ({
    type: LOGOUT,
  });
};
