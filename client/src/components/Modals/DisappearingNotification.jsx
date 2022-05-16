import S from "./DisappearingNotification.styled";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideDisappearingNoti } from "../../redux/reducer/disappearingSlice";

const DisappearingNotification = () => {

    const state = useSelector(state => state.disappearingNoti);
    const dispatch = useDispatch();

    useEffect(() => {
        if(state.isVisible){
            setTimeout(() => dispatch(hideDisappearingNoti()), 3000);
        }
    }, [state.isVisible, dispatch])

    return (
        <S.DisappearingNotification isVisible={state.isVisible}>
            <S.Pre>{state.text}</S.Pre>
            <S.Span onClick={() => dispatch(hideDisappearingNoti())}>x</S.Span>
            <S.Div></S.Div>
        </S.DisappearingNotification>
    );
}

export default DisappearingNotification;