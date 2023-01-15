import { LOGOUT, SET_USER } from './userActions';

const initialState = {
  email: null,
  id: null,
  username: null,
  bio: null,
  token: null,
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
