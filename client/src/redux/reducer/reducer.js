import {combineReducers} from 'redux';
import notificationReducer from './notificationReducer';
import loading from './loadingSlice';
import signup from './signupSlice';

const reducer = combineReducers({notificationReducer, loading, signup});

export default reducer;