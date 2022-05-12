import S from "./MyMissions.styled";

const MyMissions = ({userCreatedMissions}) => {
    console.log(userCreatedMissions);
    // [{_id, title, description, createdAt, updatedAt}]
    return (
        <S.MyMissions>
            내가 출제한 미션
            {userCreatedMissions.map((el) => <S.P key={el._id}>{el.title}</S.P>)}
        </S.MyMissions>
    );
}

export default MyMissions;