import S from './Footer.styled';

const Footer = () => {
    return (
        <S.Footer>
            <S.Div>
                개인정보 처리방침 | 이용약관 | 고객센터 | 개발자 채용 정보
            </S.Div>
            <S.A href='https://github.com/citron03/beb-03-project3-team8' target="_blank">
                깃허브
            </S.A>
        </S.Footer>);
}

export default Footer;