import S from "./MyMission.styled";
import { parseDate } from "../../../utils/date";

const MyMission = ({data}) => {
    return (
    <S.MyMission>
        <S.P>제목 : {data.title}</S.P>
        <S.P>description : {data.description}</S.P>
        <S.P>만든 날짜 : {parseDate(data.createdAt)}</S.P>
    </S.MyMission>
    );
}

export default MyMission;