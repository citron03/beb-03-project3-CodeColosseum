import {combineReducers} from 'redux';
import notificationReducer from './notificationReducer';
import loading from './loadingSlice';
import signup from './signupSlice';
import disappearingNoti from './disappearingSlice';
import darkMode from './darkModeSlice';

const reducer = combineReducers({notificationReducer, loading, signup, disappearingNoti, darkMode});

export default reducer;