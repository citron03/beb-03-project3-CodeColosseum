import S from "./ListTitle.styled";

const ListTitle = ({isColosseum}) => {

    const title = isColosseum ? "콜로세움에 오신 걸 환영합니다" : "연습문제";

    return (
            <S.ListTitle>
                {isColosseum ? <S.ColosseumH1>{title}</S.ColosseumH1> : <S.H1>{title}</S.H1>}
            </S.ListTitle>
        );
}

export default ListTitle;