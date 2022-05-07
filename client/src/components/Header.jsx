import colosseumImg from './../assets/colosseum-gf6c24e2e2_1280.png'
import S from './Header.styled';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchAccount } from '../redux/reducer/accountSlice';
import { logout } from '../redux/reducer/accountSlice';

const Header = () => {
    const navigate = useNavigate();
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    return (
    <S.Header>
        <S.Title>
            <S.Image src={colosseumImg} alt="Header image" onClick={() => navigate('/')}/>
            <S.SpanDiv onClick={() => navigate('/')}>
                <S.Span>Code</S.Span>
                <S.Span>Colosseum</S.Span>
            </S.SpanDiv>
        </S.Title>
        <S.LinkDiv>
            <Link to='/'>
                <S.Div>Home</S.Div>
            </Link>
            <Link to='/missions'>
                <S.Div>Missions</S.Div>
            </Link>
            <Link to='/register'>
                <S.Div>Register Mission</S.Div>
            </Link>
            <Link to='/mypage'>
                <S.Div>Mypage</S.Div>
            </Link>
        </S.LinkDiv>
        <S.AccountDiv>
            {account.account ? <S.P>로그인한 계정 : {account.nickname}</S.P> : <S.P>로그인이 필요합니다.</S.P>}
            {account.account ? <S.Button onClick={() => dispatch(logout())}>로그아웃</S.Button> : <S.Button onClick={() => dispatch(fetchAccount())}>로그인</S.Button>}
        </S.AccountDiv>
    </S.Header>);
}

export default Header;