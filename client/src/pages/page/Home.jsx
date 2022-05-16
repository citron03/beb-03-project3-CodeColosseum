import S from "./Home.styled";
import { Carousel } from "../../components/Home";

const Home = () => {

    return (
        <S.Home>
            <S.HeadDiv>
                <Carousel/>
            </S.HeadDiv>
        </S.Home>
    );
}

export default Home;