import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAccount, showSignUp } from "../redux/reducer/signupSlice";
import { showDisappearingNoti } from "../redux/reducer/disappearingSlice";
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
                      dispatch(showDisappearingNoti("로그인 되었습니다"));
                    }
                }              
            })
            .catch(err => console.log(err));
  }, [dispatch, state])
}

export { useLogin, useCheckLogin };