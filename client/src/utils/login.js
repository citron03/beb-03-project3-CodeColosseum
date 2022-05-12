import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount } from "../redux/reducer/signupSlice";
import { getAccountAddress } from "./address";

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

export { useLogin };