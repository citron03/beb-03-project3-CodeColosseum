import S from "./MyMissions.styled";
import MyMission from "./MyMission";

const MyMissions = ({userCreatedMissions}) => {
    return (
        <S.MyMissions>
            <S.H2>내가 출제한 미션들</S.H2>
            <S.Div>
                {userCreatedMissions ? 
                    userCreatedMissions.map((el) => 
                        <MyMission key={el._id} data={el}/>)
                : <S.P>출제한 문제가 없습니다.</S.P>}
            </S.Div>
        </S.MyMissions>
    );
}

export default MyMissions;