import S from "./UnOpened.styled";

const UnOpened = () => {
    return (
        <S.UnOpened>
            <S.P>지불하신 문제입니다. 다만, 오픈 시간이 아니니 문제가 열린 뒤에 다시 콜로세움에 접근해 주세요.</S.P>
            <S.P>오픈 시간까지 2명 이상의 도전자가 모이지 않으면, 지불한 토큰은 환불됩니다.</S.P>
        </S.UnOpened>
    );
}

export default UnOpened;