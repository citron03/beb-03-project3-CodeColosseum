import S from "./Home.styled";
import { Carousel } from "../../components/Home";
import { payToken } from "../../contracts/tokenContract";

const Home = () => {

    return (
        <S.Home>
            <S.HeadDiv>
                <Carousel/>
            </S.HeadDiv>
            <button style={{fontSize: "3rem"}} onClick={() => payToken()}>토큰 전송 테스트</button>
        </S.Home>
    );
}

export default Home;