import S from "./Loading.styled";
import { useSelector } from "react-redux";

const Loading = () => {
    const state = useSelector(state => state.loading); 
    return (
        <S.Loading isLoading={state.isLoading}>
            <S.Div>
                {state.text}
            </S.Div>
        </S.Loading>
    );
}

export default Loading;