import S from "./MyMissions.styled";
import { parseDate } from "../../../utils/date";

const MyMissions = ({userCreatedMissions}) => {
    // console.log(userCreatedMissions);
    // [{_id, title, description, createdAt, updatedAt}]
    return (
        <S.MyMissions>
            <S.H2>내가 출제한 미션들</S.H2>
            {userCreatedMissions ? 
                userCreatedMissions.map((el) => 
                    <S.Div key={el._id}>
                        <S.P>제목 : {el.title}</S.P>
                        <S.P>description : {el.description}</S.P>
                        <S.P>만든 날짜 : {parseDate(el.createdAt)}</S.P>
                    </S.Div>)
            : null}
        </S.MyMissions>
    );
}

export default MyMissions;