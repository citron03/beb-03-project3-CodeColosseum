import S from "./Mypage.styled";
import { AccountInfo } from "../../components/Mypage";


const Mypage = () => {
    return (
        <S.Mypage>
            마이 페이지
            <AccountInfo />
        </S.Mypage>
    );
}

export default Mypage;