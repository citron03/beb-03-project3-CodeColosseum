import S from "./AccountInfo.styled";
import C from "../../CommonStyled";
import { useState, useEffect } from "react";
import Login from "../../Login";
import getAddress from "../../../utils/getAddress";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/action";

const AccountInfo = () => {
    const dispatch = useDispatch();
    const [newNickname, setNewNickname] = useState("");
    const [account, setAccount] = useState("");

    useEffect(() => {
        getAddress()
            .then(el => setAccount(el))
            .catch(err => console.log(err));
        // 닉네임 정보도 get으로 불러온다.
    }, []);

    const handleNickname = () => {
        if(newNickname.length >= 4){
            // 닉네임 post 요청.
        } else {
            dispatch(showNotification("닉네임은 4글자 이상이 되어야 합니다."));
        }
    }

    return (
        <S.AccountInfo>
            {account ? 
            <>
                <S.H1>계정 주소 : {account}</S.H1>
                <S.H1>닉네임 : {"nickname"}</S.H1>
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