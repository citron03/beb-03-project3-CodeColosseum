import S from "./SolvedMissions.styled";
import Callenge from "./Callenge";

const SolvedMissions = ({userCallenges}) => {
    // console.log(userCallenges);
    // [{_id, mission, isPassed, PassedCasesRate, createdAt, updatedAt}]
    return (
        <S.SolvedMissions>
            <S.H2>제출 시도</S.H2>
            {userCallenges ? 
                    <S.Div>
                        {userCallenges.map((el) => 
                            <Callenge key={el._id} data={el}/>)}
                    </S.Div>
            : null}
        </S.SolvedMissions>
    );
}

export default SolvedMissions;