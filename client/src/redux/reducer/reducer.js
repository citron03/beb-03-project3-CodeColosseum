import {combineReducers} from 'redux';
import notificationReducer from './notificationReducer';
import account from './accountSlice';
import loading from './loadingSlice';

const reducer = combineReducers({notificationReducer, account, loading});

export default reducer;