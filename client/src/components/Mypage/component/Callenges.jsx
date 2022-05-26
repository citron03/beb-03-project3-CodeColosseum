import S from "./Callenges.styled";
import Callenge from "./Callenge";

const Callenges = ({userCallenges}) => {
    return (
        <S.Callenges>
            <S.H2>제출 시도</S.H2>
            {!!userCallenges && userCallenges.length > 0 ? 
                    <S.Div>
                        {userCallenges.map((el) => 
                            <Callenge key={el._id} data={el}/>)}
                    </S.Div>
            : <S.P>제출을 한 번도 시도하지 않았습니다.</S.P>}
        </S.Callenges>
    );
}

export default Callenges;