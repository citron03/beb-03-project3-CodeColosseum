import S from "./ListTitle.styled";

const ListTitle = ({isColosseum}) => {

    const title = isColosseum ? "콜로세움에 오신 걸 환영합니다" : "연습문제";

    return (
            <S.ListTitle>
                {isColosseum ? 
                <S.H1>
                    <S.Sword/>{title}<S.Shield/>
                </S.H1> 
                : <S.H1>
                    <S.Fitness/>{title}
                </S.H1>}
            </S.ListTitle>
        );
}

export default ListTitle;