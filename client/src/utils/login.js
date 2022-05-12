import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount, showSignUp } from "../redux/reducer/signupSlice";
import { getAccountAddress } from "./address";
import { getAccount } from "./address";

const useLogin = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      window.klaytn.on('accountsChanged', () => {
          console.log("kaikas에서 계정 변경 탐지");
          getAccountAddress()
            .then(el => dispatch(setAccount(el)))
            .catch(err => console.log(err));          
        })
    });
}

const useCheckLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        getAccount()
            .then(el => {
                if(el.data.message === "user not found!"){ // 회원가입 필요
                    dispatch(showSignUp());
                }else {
                    dispatch(setAccount(el.data.data));
                    // 사라지는 로그인 알림 창
                }              
            })
            .catch(err => console.log(err));
  }, [dispatch])
}

export { useLogin, useCheckLogin };