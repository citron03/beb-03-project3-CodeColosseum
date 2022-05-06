import S from "./MissionList.styled";
import { Missions } from "./../../components/MissionList";

const MissionList = () => {
    return (
        <S.MissionList>
            <Missions/>        
        </S.MissionList>
    );
}

export default MissionList;