import S from "./MyMission.styled";
import C from "./../../CommonStyled";
import { parseDate } from "../../../utils/date";
import { useSelector } from "react-redux";

const MyMission = ({data}) => {
    const state = useSelector(state => state.signup).account;
    return (
        <S.MyMission>
            <S.P>제목 : {data.title}</S.P>
            <S.P>description : {data.description}</S.P>
            <S.P>만든 날짜 : {parseDate(data.createdAt)}</S.P>
            <S.ButtonDiv>
                <C.Button onClick={() => console.log("계정: " + state.account, "문제: " + data._id)}>NFT로 만들기</C.Button>
                <C.Button onClick={() => console.log("계정: " + state.account, "문제: " + data._id)}>연습문제로 만들기</C.Button>
            </S.ButtonDiv>
        </S.MyMission>
    );
}

export default MyMission;