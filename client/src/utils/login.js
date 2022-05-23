import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAccount, showSignUp } from "../redux/reducer/signupSlice";
import { showDisappearingNoti } from "../redux/reducer/disappearingSlice";
import { showNotification } from "../redux/action";
import { getAccountAddress } from "./address";
import { getAccount } from "./address";

const useLogin = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.klaytn.on('accountsChanged', () => {
        console.log("kaikas에서 계정 변경 탐지");
        const path = window.location.pathname;
        if(path.startsWith("/mission/colosseum")){
          window.location.href = "/";
          dispatch(showNotification("콜로세움 문제 도전 중\n 계정을 바꾸면 안됩니다!"));
        }
        getAccountAddress()
          .then(el => dispatch(setAccount(el)))
          .catch(err => console.log(err));          
      });
  });
}

const useCheckLogin = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.signup).account;
  useEffect(() => {
        console.log("Check Login!");
        getAccount()
            .then(el => {
                if(el.data.message === "user not found!"){ // 회원가입 필요
                    dispatch(showSignUp());
                }else {
                    if(JSON.stringify(state) !== JSON.stringify(el.data.data)){
                      dispatch(setAccount(el.data.data));
                      const addressStr = el.data.data.account.slice(0, 4) + 
                        "..." + el.data.data.account.slice(el.data.data.account.length - 4);
                      dispatch(showDisappearingNoti(`${addressStr}\n로그인 되었습니다`));
                    }
                }              
            })
            .catch(err => console.log(err));
  }, [dispatch, state])
}

export { useLogin, useCheckLogin };