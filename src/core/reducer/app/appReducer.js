import { SET_CATEGORY, SET_SUB } from './appActions';

const initialState = {
  category: null, // { id: 1, name: 'Category name' }
  sub: null, // { id: 1, name: 'Sub name' }
};

// eslint-disable-next-line default-param-last
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SET_SUB:
      return {
        ...state,
        sub: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
