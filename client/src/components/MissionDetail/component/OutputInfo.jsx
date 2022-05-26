import S from "./OutputInfo.styled";

const OutputInfo = ({output}) => {
    return (
        <S.OutputInfo>
        {output ? 
            <S.OutputDiv>
                <S.P>output의 타입: {output.type}</S.P>
                <S.P>설명: {output.description}</S.P>
            </S.OutputDiv>
         : null}
         </S.OutputInfo>
    );
}

export default OutputInfo;