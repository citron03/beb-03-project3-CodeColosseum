import S from "./MissionDetail.styled";
import C from "../../components/CommonStyled";
import { Information, Scoring, Payment, OutputInfo, ArgsInfo, TimeLimit, UnOpened } from "./../../components/MissionDetail";
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
    const [isOpen, setIsOpen] = useState(false);
    const [missionData, setMissionData] = useState({});
    const [txSignReqObj, setTxSignReqObj] = useState({});
    const state = useSelector(state => state.signup).account;
    const dispatch = useDispatch();
    
    useCheckLogin();

    const { data } = useQuery(["/mission/practice", id], async () => {
        return axios.get(`/mission/practice/${id}`) 
                        .then(el => el.data.data)
                        .catch(err => console.log(err));
    }, { enabled: !isColosseum }); // 연습문제일 때 get으로 데이터를 받아온다.
    
    useEffect(() => {
        if(data?.missionInfo){
            setMissionData(data.missionInfo); // 연습 문제 데이터 세팅
        }
    }, [data]);

    useEffect(() => {
        if(!isColosseum) {
            // 연습문제는 지불과 대기가 필요하지 않다.
            setIsPaid(true); 
            setIsOpen(true);
        } else if(state?.account) {
            console.log(state.account);
            axios.post(`/mission/colosseum/${id}`, {account: state.account}) // 지불 했는지 확인
                    .then(el => {
                        console.log(el.data.data);
                        if(el.data.data.isPayment) { 
                            setIsPaid(true);
                            if(el.data.data.isOpen) {
                                setIsOpen(true);
                                setMissionData(el.data.data);
                            }
                        } else {
                            setTxSignReqObj(el.data.data.txSignReqObj);
                        }
                    })
                    .catch(err => console.log(err));
        }
    }, [isColosseum, id, state]);

    useEffect(() => {
        if(missionData?.inputs){ // 에디터에 인자를 포함하는 디폴트 코드 설정
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

    const submitAnswer = async (reqType) => {
        const url = `/mission/challenge/${isColosseum ? "colosseum" : "practice"}`;
        const payload = {
            account: state.account,
            missionId: id,
            code,
        }
        if(!isColosseum){
            payload.reqType = reqType;
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

    const handleSubmit = (reqType = null) => {
        if(state.account){
            dispatch(onLoading("채점중..."));
            setTimeout(() => {
                if(syntaxError.length === 0){
                    mutate(reqType);
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
                isOpen ?  
                    <S.MissionDetail>
                        {missionData?.title ? <Information data={missionData}/> : null}
                            <S.EditorDiv>
                                {isColosseum ? <TimeLimit endTime={missionData?.endTime}/> : null}
                                <S.SupportDiv>
                                    {missionData?.inputs?.length > 0 ? missionData.inputs.map((el, idx) => 
                                        <ArgsInfo key={idx} index={idx} arg={el}/>) 
                                        : <S.P>인자가 필요하지 않습니다.</S.P>}
                                    <OutputInfo output={missionData?.output}/>
                                    {state?.nickName === missionData?.create || isColosseum ? null
                                    : <C.Button onClick={() => handleSubmit(1)}>테스트</C.Button>}                            
                                    {state?.nickName === missionData?.create ? <S.P>제출할 수 없습니다.</S.P>
                                    : <C.Button onClick={() => handleSubmit(2)}>제출 !</C.Button>}
                                </S.SupportDiv>
                                <S.FunctionDiv>
                                    {argDefautCode ? <Editor handleCode={setCode} defautCode={argDefautCode} setSyntaxError={setSyntaxError}/> : null}
                                </S.FunctionDiv>
                            </S.EditorDiv>
                            {state?.nickName === missionData?.create ? <S.P>당신이 출제한 문제입니다.</S.P>
                            : <Scoring grading={grading} id={id}/>}
                    </S.MissionDetail> 
                : <UnOpened/>
            : <Payment setIsPaid={setIsPaid} id={id} setMissionData={setMissionData} txSignReqObj={txSignReqObj} setIsOpen={setIsOpen}/>
        : <Login/> }
        </>
    );
}

export default MissionDetail;