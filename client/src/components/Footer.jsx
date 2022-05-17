import S from './Footer.styled';

const Footer = () => {
    return (
        <S.Footer>
            <S.Div>
                <S.P>개인정보 처리방침 | 이용약관 | 고객센터 | 개발자 채용 정보</S.P>
                <S.A href='https://github.com/citron03/beb-03-project3-team8' target="_blank">깃허브</S.A>
            </S.Div>
            <S.P>이 페이지에는 네이버에서 제공한 나눔글꼴이 적용되어 있습니다.</S.P>
        </S.Footer>);
}

export default Footer;