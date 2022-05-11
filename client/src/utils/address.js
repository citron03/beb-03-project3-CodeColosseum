import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccount, showSignUp } from "../redux/reducer/signupSlice";

const getAccount = async () => {
    if (window.klaytn !== 'undefined') {
        if (window.klaytn.isKaikas) {
            const accounts = await window
                .klaytn
                .enable();
            const checkUser = await axios(`/user/${accounts[0]}`);
            return checkUser;
            // console.log(checkUser.data);
            // if(checkUser.data.message === "user not found!"){ // 회원가입 필요
            //     dispatch(showSignUp());
            // }
            // dispatch(setAccount(checkUser.data));
        }
    } else {
        // 없음
        alert("No Kaikas!");
    }
}

export {getAccount};