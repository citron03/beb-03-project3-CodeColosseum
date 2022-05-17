import S from "./MyMissions.styled";
import MyMission from "./MyMission";

const MyMissions = ({userCreatedMissions}) => {
    // console.log(userCreatedMissions);
    // [{_id, title, description, createdAt, updatedAt}]
    return (
        <S.MyMissions>
            <S.H2>내가 출제한 미션들</S.H2>
            <S.Div>
                {userCreatedMissions ? 
                    userCreatedMissions.map((el) => 
                        <MyMission key={el._id} data={el}/>)
                : null}
            </S.Div>
        </S.MyMissions>
    );
}

export default MyMissions;