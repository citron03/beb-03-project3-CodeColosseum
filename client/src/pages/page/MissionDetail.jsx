import S from "./MissionDetail.styled";
import C from "../../components/CommonStyled";
import { useParams } from 'react-router-dom'
import { Information, Scoring } from "./../../components/MissionDetail";
import Editor from "./../../components/Editor"
import { useState } from "react";
import { useSelector } from "react-redux";
import { defautCode } from "./../../assets/constants";
import Login from "./../../components/Login";
import axios from 'axios';
import { useMutation } from "react-query";
import { dummydata } from "../../assets/dummydata";

const MissionDetail = () => {
    const id = parseInt(useParams().id);
    const [code, setCode] = useState(defautCode);
    const [grading, setGrading] = useState({}); // post로 채점 데이터를 받아온다.
    const state = useSelector(state => state.account);
    const dummy = dummydata.filter(el => el.id === id)[0];

    const submitAnswer = async () => {
        const url = `http://localhost:4000/mission/challenge`;
        const payload = {
            "account" : state.account,
            "missionId" : "mission1",
            "code" : code,
        }
        return axios.post(url, payload)
            .then(el => console.log(el))
            .catch(err => console.log(err));
    }

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(submitAnswer);

    console.log(`isLoading: ${isLoading}, isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`);

    return (
        <S.MissionDetail>
            <Information data={dummy}/>
            {state.account ? 
                <>
                    <S.EditorDiv>
                        <S.SupportDiv>
                            {dummy.argTypes.length > 0 ? dummy.argTypes.map((el, idx) => 
                                <S.P key={idx}>{`${idx + 1}번째 인자의 타입은 ${el}입니다.`}</S.P>) 
                                : <S.P>인자가 필요하지 않습니다.</S.P>}
                            <C.Button onClick={mutate}>제출 !</C.Button>
                        </S.SupportDiv>
                        <S.FunctionDiv>
                            <Editor handleCode={setCode} defautCode={defautCode}/>
                        </S.FunctionDiv>
                    </S.EditorDiv>
                    <Scoring grading={grading}/>
                </> 
                : <Login/>}
        </S.MissionDetail>
    );
}

export default MissionDetail;