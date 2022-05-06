import S from "./MissionDetail.styled";
import { useParams } from 'react-router-dom'
import { Information, Scoring } from "./../../components/MissionDetail";
import Editor from "./../../components/Editor"
import { useState } from "react";
import { dummydata } from "../../assets/dummydata";
import { defautCode } from "./../../assets/constants";

const MissionDetail = () => {
    const id = parseInt(useParams().id);
    const [code, setCode] = useState(defautCode);
    const [grading, setGrading] = useState({}); // post로 채점 데이터를 받아온다.
    const data = dummydata.filter(el => el.id === id)[0];

    return (
        <S.MissionDetail>
            <Information data={data}/>
            <S.EditorDiv>
                <S.SupportDiv>
                    {data.argTypes.length > 0 ? data.argTypes.map((el, idx) => 
                        <S.P key={idx}>{`${idx + 1}번째 인자의 타입은 ${el}입니다.`}</S.P>) 
                        : <S.P>인자가 필요하지 않습니다.</S.P>}
                    <S.Button onClick={() => console.log(code)}>제출 !</S.Button>
                </S.SupportDiv>
                <S.FunctionDiv>
                    <Editor handleCode={setCode} defautCode={defautCode}/>
                </S.FunctionDiv>
            </S.EditorDiv>
            <Scoring grading={grading}/>
        </S.MissionDetail>
    );
}

export default MissionDetail;