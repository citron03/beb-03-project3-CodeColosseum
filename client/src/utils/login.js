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
}

export { useLogin };