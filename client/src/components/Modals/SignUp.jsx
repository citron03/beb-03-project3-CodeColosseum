import S from "./SignUp.styled";
import C from ".././CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { hideSignUp } from "../../redux/reducer/signupSlice";
import { getAccountAddress } from "../../utils/address";
import { showNotification } from "../../redux/action";
import axios from "axios";

const SignUp = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.signup);

    const AcceptSignUp = async () => {
        try {
            const account = await getAccountAddress();
            const registerUser = await axios.post("/user", {account});
            if(!registerUser){
                dispatch(showNotification("데이터가 없습니다."));
                console.log(registerUser);
            }
            const nickName = account.slice(account.length - 4);
            dispatch(showNotification(`${nickName}님께 테스트 토큰 300개를 전송해드렸습니다.\n건투를 빕니다!`));
            // window.location.reload();
        } catch {
            dispatch(showNotification("회원 가입 에러 발생"));
        }
        dispatch(hideSignUp())
    }

    return (
        <S.SignUp isVisible={state.isVisible}>
            <S.H2>등록이 필요한 서비스입니다. 현재 계정으로 서비스에 등록합니다.</S.H2>
            {/* <C.Button onClick={AcceptSignUp}>회원 가입</C.Button> */}
            <C.Button onClick={() => {
                            dispatch(hideSignUp());
                            AcceptSignUp();
                        }}>확인</C.Button>
        </S.SignUp>
    );
}

export default SignUp;