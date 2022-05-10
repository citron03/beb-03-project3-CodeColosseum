import S from "./Missions.styled";
import Mission from "./Mission";
import { dummydata } from "../../../assets/dummydata";
import axios from "axios";
import { useEffect } from "react";

const Missions = () => {

    useEffect(() => {
        console.log("@@");
        axios.get("/mission/list")
            .then(el => console.log(el.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <S.Missions>
            {dummydata.length > 0 ? 
                dummydata.map((el) => <Mission key={el.id} data={el}/>) 
                : <S.P>문제가 없습니다.</S.P>}
        </S.Missions>
    );
}

export default Missions;