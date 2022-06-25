import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAccount, showSignUp } from "../redux/reducer/signupSlice";
import { showDisappearingNoti } from "../redux/reducer/disappearingSlice";
import { showNotification } from "../redux/action";
import { getAccount } from "./address";

const useLogin = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (window.klaytn !== 'undefined') {    
      window.klaytn.on('accountsChanged', () => {
          // console.log("kaikas에서 계정 변경 탐지");
          const path = window.location.pathname;
          if(path.startsWith("/mission/colosseum")){
            // window.location.href = "/";
            dispatch(showNotification("콜로세움 문제 도전 중\n 계정을 바꾸면 안됩니다!"));
          }
          getAccount()
              .then(el => {
                  if(el.data.message === "user not found!"){ // 회원가입 필요
                      dispatch(showSignUp());
                  } else {
                      dispatch(setAccount(el.data.data));
                      dispatch(showDisappearingNoti(`${el.data.data.nickName}님으로\n계정이 변경되었습니다.`));
                  }              
              })
              .catch(err => console.log(err));    
        });
    } else {
        alert("No Kaikas! 카이카스 지갑을 설치해주세요.");
    }     
  });       
}

const useCheckLogin = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.signup).account;
  useEffect(() => {
        getAccount()
            .then(el => {
                if(el.data.message === "user not found!"){ // 회원가입 필요
                    dispatch(showSignUp());
                }else {
                  if(JSON.stringify(state) !== JSON.stringify(el.data.data)){
                    dispatch(setAccount(el.data.data));
                    dispatch(showDisappearingNoti(`${el.data.data.nickName}님\n어서오세요!`));
                  }
                }              
            })
            .catch(err => console.log(err));
  }, [dispatch, state])
}

const useRefreshLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        getAccount()
            .then(el => {
                if(el.data.message === "user not found!"){ // 회원가입 필요
                  dispatch(showSignUp());
                }else {
                  dispatch(setAccount(el.data.data));
                  dispatch(showDisappearingNoti(`${el.data.data.nickName}님\n어서오세요!`));
                }              
            })
            .catch(err => console.log(err));
  }, [dispatch])  
}

export { useLogin, useCheckLogin, useRefreshLogin };
