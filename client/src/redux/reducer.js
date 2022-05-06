import {combineReducers} from 'redux';
import { SHOW_NOTIFICATION, REMOVE_NOTIFICATION } from './action';

const initialNotification = {
    isVisible: false,
    text: "빈 알림"
}

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {text: action.payload.text, isVisible: true};
        case REMOVE_NOTIFICATION:
            return {text: "", isVisible: false};            
        default:
            return state;
    }
}


const reducer = combineReducers({notificationReducer});

export default reducer;