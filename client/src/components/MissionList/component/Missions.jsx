import S from "./Missions.styled";
import Mission from "./Mission";

const Missions = ({data, isColosseum}) => {

    const text = isColosseum ? "콜로세움이 비어있습니다..." : "문제가 없습니다.";

    return (
        <S.Missions>
            {data ? 
                data.map((el) => <Mission key={el.missionId} data={el} isColosseum={isColosseum}/>) 
                : <S.P>{text}</S.P>}
        </S.Missions>
    );
}

export default Missions;