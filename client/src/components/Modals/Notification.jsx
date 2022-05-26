import S from "./Notification.styled";
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from "../../redux/action";
import { AiOutlineNotification } from 'react-icons/ai';

const Notification = () => {
    const state = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch();

    return (
        <S.Notification isVisible={state.isVisible} onClick={() => dispatch(removeNotification())}>
            <S.Title>
                <AiOutlineNotification/> Notification
            </S.Title>
            <S.Pre>{state.text}</S.Pre>
        </S.Notification>
    );
}

export default Notification;