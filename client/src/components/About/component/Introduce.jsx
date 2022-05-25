import S from "./Introduce.styled";

const Introduce = ({introduceRef}) => {
    return (
        <S.Introduce ref={introduceRef}>
            <S.H1>Code Colosseum은 Online Judgment 사이트입니다.</S.H1>
            <S.Div>
                <S.TextDiv>
                    <S.H2>Code Colosseum에서 활동을 하고 토큰을 받으세요!</S.H2>
                    <S.P>가장 먼저 콜로세움 미션을 해결하면, 토큰을 받을 수 있습니다.</S.P>
                    <S.P>문제를 출제하고, 토큰을 획들할 수 있습니다.</S.P>
                    <S.P>좋은 문제를 출제했다면, 추가적인 benefit을 얻을 수 있습니다.</S.P>
                    <S.P>해결한 문제를 평가해주세요. 다른 사용자에게 도움이 됩니다.</S.P>
                    <S.P>Code Colosseum은 시간 제한이 있는 실전과 같은 환경을 제공합니다.</S.P>
                    <S.P>시간 제한이 없는 연습 문제를 해결하고 미네랄을 받으세요.</S.P>
                </S.TextDiv>
                <S.TextDiv>
                    <S.H2>Code Colosseum은 클레이튼 기반의 블록체인 웹 사이트입니다!</S.H2>
                    <S.P>토큰을 사용하여 콜로세움 문제에 도전할 수 있습니다.</S.P>
                    <S.P>당신이 출제한 문제를 NFT로 만들 수 있습니다.</S.P>
                    <S.P>CCT는 클레이튼 네트워크의 KIP-7 토큰입니다.</S.P>
                    <S.P>Code Colosseum의 서비스를 이용하기 위해서는 Kaikas지갑이 필요합니다.</S.P>
                    <S.P>최신 버전의 Google Chrome 브라우저를 사용하기를 권장드립니다.</S.P>
                    <S.P>미네랄을 모아 CCT로 교환할 수 있습니다.</S.P>
                </S.TextDiv>
            </S.Div>
        </S.Introduce>
    );
}

export default Introduce;