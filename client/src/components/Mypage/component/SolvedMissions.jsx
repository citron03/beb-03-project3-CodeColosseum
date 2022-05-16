import S from "./SolvedMissions.styled";
import { parseDate } from "../../../utils/date";

const SolvedMissions = ({userCallenges}) => {
    // console.log(userCallenges);
    // [{_id, mission, isPassed, PassedCasesRate, createdAt, updatedAt}]
    return (
        <S.SolvedMissions>
            <S.H2>제출 시도</S.H2>
            {userCallenges ? 
                    <S.Div>
                        {userCallenges.map((el) => 
                            <S.CallengesDiv key={el._id}>
                                <S.P>문제 번호 : {el.mission}</S.P>
                                <S.P>{el.isPassed ? "통과" : "실패"}</S.P>
                                <S.P>테스트 통과율 : {el.PassedCasesRate}</S.P>
                                <S.P>제출일 : {parseDate(el.createdAt)}</S.P>
                            </S.CallengesDiv>
                            )}
                    </S.Div>
            : null}
        </S.SolvedMissions>
    );
}

export default SolvedMissions;