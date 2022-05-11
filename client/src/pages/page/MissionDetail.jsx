import S from "./MissionDetail.styled";
import C from "../../components/CommonStyled";
import { useParams } from 'react-router-dom'
import { Information, Scoring } from "./../../components/MissionDetail";
import Editor from "./../../components/Editor"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { defautCode } from "./../../assets/constants";
import axios from 'axios';
import { useMutation } from "react-query";
import { showNotification } from "../../redux/action";
import { onLoading, offLoading } from "../../redux/reducer/loadingSlice";
import getAddress from "../../utils/getAddress";
import { useQuery } from "react-query";

const MissionDetail = () => {
    const id = useParams().id;
    const [code, setCode] = useState(defautCode);
    const [syntaxError, setSyntaxError] = useState([]);
    const [grading, setGrading] = useState({});
    const dispatch = useDispatch();

    const { data } = useQuery(["/mission/detail", id], async () => {
        return axios.get(`/mission/${id}`) 
                    .then(el => el.data)
                    .catch(err => console.log(err));
    });

    const submitAnswer = async () => {
        const url = `/mission/challenge`;
        const payload = {
            "account" : await getAddress(),
            "missionId" : id,
            "code" : code,
        }
        console.log(payload);
        axios.post(url, payload)
                .then(el => setGrading(el.data))
                .catch(err => console.log(err));
    }

    const { mutate } = useMutation(submitAnswer);

    const handleSubmit = () => {

        dispatch(onLoading("채점중입니다"));
        setTimeout(() => {
            if(syntaxError.length === 0){
                mutate();
            } else {
                dispatch(showNotification("작성한 코드에 에러가 있습니다."));
            }
            dispatch(offLoading());
        }, 1000);
    };
    
    return (
        <S.MissionDetail>
            {data?.title ? <Information data={data}/> : null}
                <S.EditorDiv>
                    <S.SupportDiv>
                        {/* {missionData.argTypes.length > 0 ? missionData.argTypes.map((el, idx) => 
                            <S.P key={idx}>{`${idx + 1}번째 인자의 타입은 ${el}입니다.`}</S.P>) 
                            : <S.P>인자가 필요하지 않습니다.</S.P>} */}
                        <C.Button onClick={handleSubmit}>제출 !</C.Button>
                    </S.SupportDiv>
                    <S.FunctionDiv>
                        <Editor handleCode={setCode} defautCode={defautCode} setSyntaxError={setSyntaxError}/>
                    </S.FunctionDiv>
                </S.EditorDiv>
                <Scoring grading={grading} id={id}/>
        </S.MissionDetail>
    );
}

export default MissionDetail;