import S from "./MyMissions.styled";
import { useEffect, useState } from "react";
import MyMission from "./MyMission";
import MissionSelector from "./MissionSelector";

const MyMissions = ({userCreatedMissions}) => {
    // 1: 콜로세움,  2: 풀림(풀렸지만 NFT화는 안됨), 3:NFT로 만들어짐(NFT화가 되었지만 공개는 안함), 4:연습문제로 공개됨
    const [selector, setSelector] = useState({"1": true, "2": true, "4": true});
    const [missionsArr, setMissionsArr] = useState([...userCreatedMissions]);

    useEffect(() => {
        const newArr = userCreatedMissions.filter(el => selector[el.state]);
        setMissionsArr(newArr);
    }, [selector, userCreatedMissions])

    return (
        <S.MyMissions>
            <S.H2>내가 출제한 미션들</S.H2>
            <MissionSelector setSelector={setSelector}/>
            <S.Div>
                {!!missionsArr && missionsArr?.length > 0 ? 
                    missionsArr.map((el) => 
                        <MyMission key={el._id} data={el}/>)
                : <S.P>해당하는 문제가 없습니다.</S.P>}
            </S.Div>
        </S.MyMissions>
    );
}

export default MyMissions;