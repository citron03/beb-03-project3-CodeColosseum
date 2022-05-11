import S from "./Missions.styled";
import Mission from "./Mission";
import axios from "axios";
import { useQuery } from "react-query";

const Missions = () => {

    const { data } = useQuery(["/mission/list"], () => {
        return axios.get("/mission/list")
            .then(el => el.data.missionList)
            .catch(err => console.log(err));
    });
    
    return (
        <S.Missions>
            {data ? 
                data.map((el) => <Mission key={el.missionId} data={el}/>) 
                : <S.P>문제가 없습니다.</S.P>}
        </S.Missions>
    );
}

export default Missions;