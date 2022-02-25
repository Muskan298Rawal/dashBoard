import { combineReducers } from 'redux';
import dashboardReducer from './dashBoardReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
