import S from './Header.styled';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GiSwordsEmblem } from 'react-icons/gi';
import { BsFileArrowUp } from 'react-icons/bs';

const Header = () => {
    const navigate = useNavigate();
    const [isClosed, setIsClosed] = useState(false);
    return (
        <>
            {isClosed ? 
            <S.ClosedDiv onClick={() => setIsClosed(prev => !prev)}>
                Code Colosseum
            </S.ClosedDiv>    
            : 
            <S.Header>
                <S.Title>
                    <S.SpanDiv onClick={() => navigate('/')}>
                        <S.Span>Code <GiSwordsEmblem/></S.Span>
                        <S.Span>Colosseum</S.Span>
                    </S.SpanDiv>
                </S.Title>
                <S.LinkDiv>
                    <Link to='/missions'>
                        <S.Div>콜로세움 회랑</S.Div>
                    </Link>
                    <Link to='/register'>
                        <S.Div>콜로세움 출제</S.Div>
                    </Link>
                    <Link to='/practice'>
                        <S.Div>연습문제</S.Div>
                    </Link>
                    <Link to='/trade'>
                        <S.Div>교역소</S.Div>
                    </Link>
                    <Link to='/bank'>
                        <S.Div>은행</S.Div>
                    </Link>
                    <Link to='/mypage'>
                        <S.Div>마이 페이지</S.Div>
                    </Link>
                </S.LinkDiv>
                <S.CasementSpan onClick={() => setIsClosed(prev => !prev)}><BsFileArrowUp/></S.CasementSpan>
            </S.Header> }
        </>
    );
}

export default Header;