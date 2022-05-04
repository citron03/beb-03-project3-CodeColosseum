import peanutImg from './../assets/peanuts-gf84b10809_640.png'
import S from './Header.styled';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <S.Header>
        <S.Image src={peanutImg} alt="Header image" />
        <S.LinkDiv>
            <Link to='/'>
                <S.Div>Home</S.Div>
            </Link>
            <Link to='/tests'>
                <S.Div>Tests</S.Div>
            </Link>
            <Link to='/mypage'>
                <S.Div>Mypage</S.Div>
            </Link>
        </S.LinkDiv>
    </S.Header>);
}

export default Header;