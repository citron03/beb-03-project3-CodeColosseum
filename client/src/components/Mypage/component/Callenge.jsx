import S from "./Callenge.styled";
import C from "../../CommonStyled";
import { parseDate } from "../../../utils/date";
import { useNavigate } from "react-router-dom";

const Callenge = ({data}) => {

    const navigate = useNavigate();

    const handleEvaluation = (data) => {
        navigate(`/feedback/${data._id}`);
    }

    return (
        <S.Callenge>
            <S.P>문제 번호 : {data.mission}</S.P>
            <S.P>{data.isPassed ? "통과" : "실패"}</S.P>
            <S.P>테스트 통과율 : {data.PassedCasesRate}</S.P>
            <S.P>제출일 : {parseDate(data.createdAt)}</S.P>
            {data.isPassed ? <C.Button onClick={() => handleEvaluation(data)}>평가하기</C.Button> : null}
        </S.Callenge>
    );
}

export default Callenge;