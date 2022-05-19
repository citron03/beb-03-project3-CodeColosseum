import S from "./About.styled";
import { CoverImage, Introduce, Navigator } from "../../components/About";
import { useRef } from "react";

const About = () => {
    const introduceRef = useRef();
    return (
        <S.About>
            <CoverImage introduceRef={introduceRef}/>
            <Introduce introduceRef={introduceRef}/>
            <Navigator/>
        </S.About>
    );
}

export default About;