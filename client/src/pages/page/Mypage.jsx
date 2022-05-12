import S from "./Mypage.styled";
import { AccountInfo, SolvedMissions, MyMissions, MypageNavigation } from "../../components/Mypage";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAccount, showSignUp } from "../../redux/reducer/signupSlice";
import {getAccount} from "../../utils/address";
import Login from "../../components/Login";
import { useQuery } from 'react-query';

const Mypage = () => {

    const state = useSelector(state => state.signup);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!state.account?.account){
            getAccount()
                .then(el => {
                    if(el.data.message === "user not found!"){ // 회원가입 필요
                        dispatch(showSignUp());
                    }else {
                        dispatch(setAccount(el.data.data));      
                    }              
                })
                .catch(err => console.log(err));
        }
    }, [dispatch, state])

    const { data } = useQuery([state.account._id], async () => {
        return axios.get(`/user/mypage/${state.account._id}`)
                .then(el => el.data)
                .catch(err => err);
    }, {enabled: !!state.account?._id});

    return (
        <S.Mypage>
            <MypageNavigation/>
            {state?.account ? 
                <Routes>
                     <Route exact path="/" element={<AccountInfo data={state.account}/>}/>
                     <Route path="/solved-missions" element={<SolvedMissions/>}/>
                     <Route path="/my-missions" element={<MyMissions/>}/>
                 </Routes> 
            : <Login/>}
        </S.Mypage>
    );
}

export default Mypage;