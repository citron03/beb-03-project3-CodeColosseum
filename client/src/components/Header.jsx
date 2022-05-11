import S from './Header.styled';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
    <S.Header>
        <S.Title>
            <S.SpanDiv onClick={() => navigate('/')}>
                <S.Span>Code</S.Span>
                <S.Span>Colosseum</S.Span>
            </S.SpanDiv>
        </S.Title>
        <S.LinkDiv>
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
    </S.Header>);
}

export default Header;