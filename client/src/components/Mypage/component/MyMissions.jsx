import S from "./MyMissions.styled";

const MyMissions = ({userCreatedMissions}) => {
    console.log(userCreatedMissions);
    return (
        <S.MyMissions>
            내가 출제한 미션
        </S.MyMissions>
    );
}

export default MyMissions;