import S from "./Missions.styled";
import Mission from "./Mission";
import axios from "axios";
import { useEffect, useState } from "react";

const Missions = () => {

    const [missionsArr, setMissionsArr] = useState([]);

    useEffect(() => {
        axios.get("/mission/list")
            .then(el => setMissionsArr(el.data.missionList))
            .catch(err => console.log(err));
    }, []);

    return (
        <S.Missions>
            {missionsArr.length > 0 ? 
                missionsArr.map((el) => <Mission key={el.missionId} data={el}/>) 
                : <S.P>문제가 없습니다.</S.P>}
        </S.Missions>
    );
}

export default Missions;