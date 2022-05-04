import peanutImg from './../assets/peanuts-gf84b10809_640.png'
import S from './Header.styled';
import { Link } from 'react-router-dom';
import { useAccount } from '../utils/account';

const Header = () => {
    const [account, handleLogin, handleLogout] = useAccount();

    return (
    <S.Header>
        <S.Image src={peanutImg} alt="Header image" />
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
            {account ? <S.P>로그인한 계정 : {account}</S.P> : <S.P>로그인이 필요합니다.</S.P>}
            {account ? <S.Button onClick={handleLogout}>로그아웃</S.Button> : <S.Button onClick={handleLogin}>로그인</S.Button>}
        </S.AccountDiv>
    </S.Header>);
}

export default Header;