import S from "./MyMission.styled";
import C from "./../../CommonStyled";
import { parseDate } from "../../../utils/date";
import { useSelector } from "react-redux";
import axios from "axios";

const handlePractice = async (account, missionId) => {
    const urlNft = "/mission/mission/mintnft";
    const url = "/mission/mission/changetopractice";
    const payload = {
        account,
        missionId
    };
    console.log(payload);
    try {
        const resNft = await axios.post(urlNft, payload);
        console.log("NFT 변환 완료", resNft);
    } catch (err) {
        console.log("NFT 변환 실패", err);
        return;
    }
    try {
        const res = await axios.post(url, payload);
        console.log("연습 문제 등록 완료", res);
    } catch (err) {
        console.log("연습 문제 변환 실패", err);
        return;
    }  
}

const MyMission = ({data}) => {
    const state = useSelector(state => state.signup).account;
    return (
        <S.MyMission>
            <S.P>제목 : {data?.title}</S.P>
            <S.P>description : {data?.description}</S.P>
            <S.P>만든 날짜 : {parseDate(data?.createdAt)}</S.P>
            <S.ButtonDiv>
                <C.Button onClick={() => handlePractice(state?.account, data?._id)}>연습문제로 만들기</C.Button>
            </S.ButtonDiv>
        </S.MyMission>
    );
}

export default MyMission;