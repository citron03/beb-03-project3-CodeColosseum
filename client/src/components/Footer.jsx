import S from "./Footer.styled";
import { useDispatch, useSelector } from "react-redux";
import { modeChange } from "../redux/reducer/darkModeSlice";
import { Link } from "react-router-dom";

const Footer = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.darkMode).isDarkMode;

    return (
        <S.Footer>
            <S.Div>
                <S.P>개인정보 처리방침 | 이용약관 | 고객센터 | 개발자 채용 정보</S.P>
                <S.LinkDiv>
                    <S.A href='https://github.com/citron03/beb-03-project3-team8' target="_blank">깃허브</S.A>
                    <Link to="/">about</Link>
                    <Link to="/news">news&event</Link>
                </S.LinkDiv>
            </S.Div>
            <S.Div>
                <S.P>이 페이지에는 네이버에서 제공한 나눔글꼴(마루 부리)이 적용되어 있습니다.</S.P>
                <S.Span onClick={() => dispatch(modeChange())}>{state ? "make light" : "make dark"}</S.Span>
            </S.Div>
        </S.Footer>
    );
}

export default Footer;