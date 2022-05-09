import S from "./Missions.styled";
import Mission from "./Mission";
import { dummydata } from "../../../assets/dummydata";

const Missions = () => {
    return (
        <S.Missions>
            {dummydata.length > 0 ? 
                dummydata.map((el) => <Mission key={el.id} data={el}/>) 
                : <S.P>문제가 없습니다.</S.P>}
        </S.Missions>
    );
}

export default Missions;