import S from "./SolvedMissions.styled";

const SolvedMissions = ({userCallenges}) => {
    console.log(userCallenges);
    // [{_id, mission, isPassed, PassedCasesRate, createdAt, updatedAt}]
    return (
        <S.SolvedMissions>
            해결한 문제
            <S.Div>
                {userCallenges.map((el) => <S.P key={el._id}>{el.isPassed}</S.P>)}
            </S.Div>
        </S.SolvedMissions>
    );
}

export default SolvedMissions;