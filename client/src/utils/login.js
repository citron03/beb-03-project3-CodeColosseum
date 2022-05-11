import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAccount } from "../redux/reducer/accountSlice";

const useLogin = () => {
    
  const dispatch = useDispatch();

    useEffect(() => {
      const isLogin = JSON.parse(localStorage.getItem("isLogin"));
      if(isLogin){
        dispatch(fetchAccount());
      }
    }, [dispatch]);

    useEffect(() => {
      window.klaytn.on('accountsChanged', () => {
          console.log("kaikas에서 계정 변경 탐지");
          dispatch(fetchAccount());
        })
    });
}

export { useLogin };