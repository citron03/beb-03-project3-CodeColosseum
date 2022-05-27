import S from "./News.styled";
import { Carousel } from "../../components/News";
import { useNavigate } from "react-router-dom";

const News = () => {
    const navigate = useNavigate();
    return (
        <S.News>
            <S.HeadDiv>
                <Carousel/>
            </S.HeadDiv>
            <S.Div onClick={() => navigate("/")}>What is the Code Colosseum?</S.Div>
        </S.News>
    );
}

export default News;