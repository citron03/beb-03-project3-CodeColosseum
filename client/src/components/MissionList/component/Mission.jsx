import S from "./Mission.styled";
import { useNavigate } from 'react-router-dom';

const Mission = ({data}) => {
    const navigate = useNavigate();

    return (
        <S.Mission onClick={() => navigate(`/mission/${data.missionId}`)}>
            <S.H3>{data.title}</S.H3>
            <S.P>평점 : ⭐⭐⭐⭐⭐</S.P>
            {/* <S.P>정답률 : 75.16%</S.P> */}
            <S.P>출제자 : {data.creator}</S.P>
        </S.Mission>
    );
}

export default Mission;