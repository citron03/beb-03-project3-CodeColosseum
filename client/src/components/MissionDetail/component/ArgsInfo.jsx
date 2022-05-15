import S from "./ArgsInfo.styled";

const ArgsInfo = ({arg, index}) => {
    return (                                
        <S.ArgInfo>
            <S.P>{`${index + 1}번째 인자인 ${arg.name}의 타입은 ${arg.type}입니다.`}</S.P>
            <S.P>설명: {arg.description}</S.P>
        </S.ArgInfo>
    );
}

export default ArgsInfo;