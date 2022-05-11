import S from "./AccountInfo.styled";
import C from "../../CommonStyled";
import { useState } from "react";
import Login from "../../Login";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/action";
import axios from "axios";

const AccountInfo = ({data}) => {
    const dispatch = useDispatch();
    const [newNickname, setNewNickname] = useState("");

    const handleNickname = () => {
        if(newNickname.length >= 4){
            // 닉네임 post 요청.
            axios.patch(`/user/${data.account}`, {nickName: newNickname})
                    .then(el => {
                        console.log(el);
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
        } else {
            dispatch(showNotification("닉네임은 4글자 이상이 되어야 합니다."));
        }
    }

    return (
        <S.AccountInfo>
            {data.account ? 
                <>
                    <S.H1>계정 주소 : {data.account}</S.H1>
                    <S.H1>닉네임 : {data.nickName}</S.H1>
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