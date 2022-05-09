import S from "./AccountInfo.styled";
import C from "../../CommonStyled";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeNickName } from "./../../../redux/reducer/accountSlice";
import { showNotification } from "../../../redux/action";
import Login from "../../Login";

const AccountInfo = () => {
    const state = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [newNickname, setNewNickname] = useState("");

    const handleNickname = () => {
        if(newNickname.length >= 4){
            dispatch(changeNickName(newNickname));
        } else {
            dispatch(showNotification("닉네임은 4글자 이상이 되어야 합니다."));
        }
    }

    return (
        <S.AccountInfo>
            {state?.account ? 
            <>
                <S.H1>계정 주소 : {state.account}</S.H1>
                <S.H1>닉네임 : {state.nickname}</S.H1>
                <S.Div>
                    <S.Label>닉네임 변경</S.Label>
                    <S.Input placeholder="변경할 닉네임" onChange={(e) => setNewNickname(e.target.value)} />
                    <C.Button onClick={handleNickname}>변경</C.Button>
                </S.Div> 
            </> : <Login/>}
        </S.AccountInfo>
    );
}

export default AccountInfo;