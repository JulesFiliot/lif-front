import { combineReducers } from 'redux';
import appReducer from './app/appReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  appReducer,
  userReducer,
});
export default rootReducer;
