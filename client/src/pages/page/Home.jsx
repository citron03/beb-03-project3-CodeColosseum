import S from "./Home.styled";
import { Carousel } from "../../components/Home";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <S.Home>
            <S.HeadDiv>
                <Carousel/>
            </S.HeadDiv>
            <S.Div onClick={() => navigate("/about")}>What is the Code Colosseum?</S.Div>
        </S.Home>
    );
}

export default Home;