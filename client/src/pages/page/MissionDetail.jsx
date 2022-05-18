import S from "./MissionDetail.styled";
import C from "../../components/CommonStyled";
import { Information, Scoring, Payment, OutputInfo, ArgsInfo, TimeLimit } from "./../../components/MissionDetail";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import Editor from "./../../components/Editor"
import { showNotification } from "../../redux/action";
import { onLoading, offLoading } from "../../redux/reducer/loadingSlice";
import { getAccount } from "../../utils/address";
import { showSignUp, setAccount } from "../../redux/reducer/signupSlice";
import Login from "../../components/Login";
import { useCheckLogin } from "../../utils/login";
import { makeDefautCode } from "../../assets/constants";
import { defautCode } from "../../assets/constants";

// 서버에 요청을 보내 해당 미션이 구매 상태가 아니면, Payment 컴포넌트를 띄운다.
const MissionDetail = ({isColosseum}) => {
    const id = useParams().id;
    const [syntaxError, setSyntaxError] = useState([]);
    const [grading, setGrading] = useState({});
    const [argDefautCode, setArgDefautCode] = useState("");
    const [code, setCode] = useState(defautCode);
    const [isPaid, setIsPaid] = useState(false);
    const [missionData, setMissionData] = useState({});
    const state = useSelector(state => state.signup).account;
    const dispatch = useDispatch();
    
    useCheckLogin();

    const { data } = useQuery(["/mission/detail", id], async () => {
        return axios.get(`/mission/${id}`) 
                        .then(el => el.data.data)
                        .catch(err => console.log(err));
    }, { enabled: !isColosseum }); // 연습문제일 때 get으로 데이터를 받아온다.

    useEffect(() => {
        if(!isColosseum) {
            setIsPaid(true); // 연습문제는 지불이 필요하지 않다.
        } else if(state?.account) {
            console.log(state.account);
            axios.post(`/mission/colosseum/${id}`, {account: state.account}) // 지불 했는지 확인
                    .then(el => {
                        console.log(el.data);
                        if(el.data.message !== "Not paying tokens"){
                            setMissionData(el.data.data);
                            setIsPaid(true);
                        }
                    })
                    .catch(err => console.log(err));
        }
    }, [isColosseum, id, state]);

    useEffect(() => {
        if(data){
            // setArgDefautCode(makeDefautCode(data?.inputs.map(el => el.name)));
            setMissionData(data); // 연습 문제 데이터 세팅
        }
    }, [data]);

    useEffect(() => {
        if(missionData.inputs){ // 에디터에 인자를 포함하는 디폴트 코드 설정
            setArgDefautCode(makeDefautCode(missionData?.inputs.map(el => el.name))); 
        }
    }, [missionData])
    
    const submitGetAccount = () => {
        dispatch(showNotification("로그인을 합니다. \n 과정이 끝난 뒤 다시 제출 버튼을 눌러주세요."));
        getAccount()
            .then(el => {
                if(el.data.message === "user not found!"){ // 회원가입 필요
                    dispatch(showSignUp());
                }
                dispatch(setAccount(el.data.data));                    
            })
            .catch(err => console.log(err));
    };

    const submitAnswer = async () => {
        const url = `/mission/challenge`;
        console.log(state);
        const payload = {
            account: state.account,
            missionId: id,
            code,
        }
        console.log(payload);
        axios.post(url, payload)
                .then(el => setGrading(el.data))
                .catch(err => {
                    console.log(err);
                    dispatch(showNotification("채점에 실패하였습니다!\n server error"));
                });
    }

    const { mutate } = useMutation(submitAnswer);

    const handleSubmit = () => {
        if(state.account){
            dispatch(onLoading("채점중입니다"));
            setTimeout(() => {
                if(syntaxError.length === 0){
                    mutate();
                } else {
                    dispatch(showNotification("작성한 코드에 에러가 있습니다."));
                }
                dispatch(offLoading());
            }, 1000);
        } else {
            submitGetAccount();
        }
    };

    return (
        <>
        {state?.account ?  
            isPaid ?
                <S.MissionDetail>
                {missionData?.title ? <Information data={missionData}/> : null}
                    <S.EditorDiv>
                        {isColosseum ? <TimeLimit endTime={missionData?.endTime}/> : null}
                        <S.SupportDiv>
                            {missionData?.inputs.length > 0 ? missionData.inputs.map((el, idx) => 
                                <ArgsInfo key={idx} index={idx} arg={el}/>) 
                                : <S.P>인자가 필요하지 않습니다.</S.P>}
                            <OutputInfo output={missionData?.output}/>
                            <C.Button onClick={handleSubmit}>제출 !</C.Button>
                        </S.SupportDiv>
                        <S.FunctionDiv>
                            {argDefautCode ? <Editor handleCode={setCode} defautCode={argDefautCode} setSyntaxError={setSyntaxError}/> : null}
                        </S.FunctionDiv>
                    </S.EditorDiv>
                    <Scoring grading={grading} id={id}/>
            </S.MissionDetail> : <Payment setIsPaid={setIsPaid} id={id} setMissionData={setMissionData}/>
            : <Login/> }
        </>
    );
}

export default MissionDetail;