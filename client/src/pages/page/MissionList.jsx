import S from "./MissionList.styled";
import { Missions, ListTitle } from "./../../components/MissionList";
import axios from "axios";
import { useQuery } from "react-query";

const MissionList = ({isColosseum}) => {
    const query = isColosseum ? 1 : 4;

    const { data } = useQuery(["/mission/list", query], async () => {
        console.log(query);
        return axios.get("/mission/list")
            .then(el => el.data.data.missionList)
            .catch(err => console.log(err));
    }, {enabled: !!query });
    
    return (
        <S.MissionList>
            <ListTitle isColosseum={isColosseum}/>
            <Missions data={data || []} isColosseum={isColosseum}/>        
        </S.MissionList>
    );
}

export default MissionList;