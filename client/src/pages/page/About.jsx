import S from "./About.styled";
import { CoverImage, Introduce, Navigator } from "../../components/About";

const About = () => {
    return (
        <S.About>
            <CoverImage/>
            <Introduce/>
            <Navigator/>
        </S.About>
    );
}

export default About;