import S from "./Scoring.styled";

const Scoring = ({grading}) => {

    return (
        <S.Scoring>
            {grading.message ? 
                <S.Div>
                    <S.P>{grading.message}</S.P> 
                    <S.P>
                        {grading.failCount === 0 ? 
                            "모든 테스트 케이스를 통과하였습니다.\n정답입니다!" 
                            : `${grading.failCount}개의 테스트를 통과하지 못했습니다.`}
                    </S.P> 
                </S.Div>
                : <S.P>코드를 작성한 뒤, 제출 버튼을 눌러주세요.</S.P>}
        </S.Scoring>
    );
}

export default Scoring;