import S from "./Notification.styled";
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from "../redux/action";

const Notification = () => {
    const state = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch();
    console.log(state);

    return (
        <S.Notification isVisible={state.isVisible} onClick={() => dispatch(removeNotification())}>
            <S.P>{state.text}</S.P>
        </S.Notification>
    );
}

export default Notification;