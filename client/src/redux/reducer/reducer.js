import {combineReducers} from 'redux';
import notificationReducer from './notificationReducer';
import account from './accountSlice';

const reducer = combineReducers({notificationReducer, account});

export default reducer;