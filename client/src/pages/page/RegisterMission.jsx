import { Arguments, FunctionArea, TestCases, Explanation } from './../../components/RegisterMission';
import S from './RegisterMission.styled';
import C from '../../components/CommonStyled';
import axios from 'axios';
import { useArguments } from '../../utils/arguments';
import { useRegister } from '../../utils/register';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../redux/action';
import { onLoading, offLoading } from '../../redux/reducer/loadingSlice';
import { getAccount } from "./../../utils/address";
import { showSignUp, setAccount } from '../../redux/reducer/signupSlice';

const RegisterMission = () => {
    const [argCount, argTypes, handleAddArg, handleRemoveArg, handleArgTypes] = useArguments();
    const [registerData, handleExplanation, handleCode, handleAddTestCase, handleRemoveTestCase, handleTitle, handleTestCaseHide, handleEmptyTestcase] = useRegister(); // 필수정보
    const [syntaxError, setSyntaxError] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.signup).account;
    
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

    const usePostMission = async (completeData) => {
        const url = `/mission`;
        console.log(completeData.argTypes);
        try {
            const payload = {
                account: state.account,
                title: completeData.title,
                description: "테스트",
                paragraph: completeData.explanation,
                inputs: [{name: "string", type: "string", required: "boolean", description: "string"}],
                output: {type: "string", description: "string"},
                refCode: completeData.code,
                testCases: completeData.testcases,
            }
            console.log(payload);
            axios.post(url, payload)
                    .then(el => {
                        console.log(el.data);
                        dispatch(showNotification("문제가 등록되었습니다."));
                        navigate("/missions");
                    })
                    .catch(err => console.log(err));
        } catch {
            dispatch(showNotification("지갑 연결에 문제가 발생했습니다."));
            return;
        }
    }

    const { mutate } = useMutation(usePostMission);

    const submitMission = () => {
        const completeData = {...registerData, argTypes};
        if(!completeData.title) {
            dispatch(showNotification("제목을 입력하세요!"));
            return;
        } else if(!completeData.explanation) {
            dispatch(showNotification("문제에는 설명이 필요합니다!"));
            return;
        } else if(!completeData.code) {
            dispatch(showNotification("이 문제의 레퍼런스 코드를 입력해주세요!"));
            return;
        } else if(completeData.testcases.length < 5){
            dispatch(showNotification(`최소 5개 이상의 테스트 케이스가 필요합니다!`));
            return;
        }
        console.log(state);
        if(state.account){
            dispatch(onLoading("문제 등록 중..."));
            setTimeout(() => {
                if(syntaxError.length === 0){
                    mutate(completeData);
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
    <S.RegisterMission>
        <S.Div>
            <S.Title>
                <S.Label>Title</S.Label>
                <S.Input placeholder='문제 이름을 입력하세요' onChange={handleTitle}/>
            </S.Title>
            <Arguments handleAddArg={handleAddArg} handleRemoveArg={handleRemoveArg} argCount={argCount} argTypes={argTypes} handleArgTypes={handleArgTypes} handleEmptyTestcase={handleEmptyTestcase}/>
            <S.Section>
                <Explanation handleExplanation={handleExplanation}/>
                <FunctionArea handleCode={handleCode} setSyntaxError={setSyntaxError}/>
            </S.Section>
            <TestCases testcases={registerData.testcases} handleAddTestCase={handleAddTestCase} handleRemoveTestCase={handleRemoveTestCase} argTypes={argTypes} handleTestCaseHide={handleTestCaseHide}/>
            <C.Button onClick={submitMission}>문제 등록하기</C.Button>            
        </S.Div> 
    </S.RegisterMission>
    );
}

export default RegisterMission;