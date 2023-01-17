import { LOGOUT, SET_USER } from './userActions';

const initialState = {
  email: null,
  id: null,
  username: null,
  bio: null,
  token: null,
  subcat_count: {},
  user_achievements: [],
};

// eslint-disable-next-line default-param-last
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state };

      if (action.payload.email) newState.email = action.payload.email;
      if (action.payload.id) newState.id = action.payload.id;
      if (action.payload.username) newState.username = action.payload.username;
      if (action.payload.bio) newState.bio = action.payload.bio;
      if (action.payload.token) newState.token = action.payload.token;
      if (action.payload.subcat_count) newState.subcat_count = action.payload.subcat_count;
      if (action.payload.user_achievements) {
        newState.user_achievements = action.payload.user_achievements;
      }

      return newState;
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
