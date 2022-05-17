import S from "./Callenge.styled";
import { parseDate } from "../../../utils/date";

const Callenge = ({data}) => {
    return (
        <S.Callenge>
            <S.P>문제 번호 : {data.mission}</S.P>
            <S.P>{data.isPassed ? "통과" : "실패"}</S.P>
            <S.P>테스트 통과율 : {data.PassedCasesRate}</S.P>
            <S.P>제출일 : {parseDate(data.createdAt)}</S.P>
        </S.Callenge>
    );
}

export default Callenge;