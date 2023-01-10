import { combineReducers } from 'redux';
import appReducer from './app/appReducer';

const rootReducer = combineReducers({
  appReducer,
});
export default rootReducer;
