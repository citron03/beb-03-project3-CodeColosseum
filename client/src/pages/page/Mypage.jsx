import S from "./Mypage.styled";
import { AccountInfo, SolvedMissions, MyMissions, MypageNavigation } from "../../components/Mypage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import getAddress from "../../utils/getAddress";
import Login from "../../components/Login";

const Mypage = () => {

    const [account, setAccount] = useState("");

    useEffect(() => {
        getAddress()
            .then(el => setAccount(el))
            .catch(err => console.log(err));
    }, []);

    return (
        <S.Mypage>
            <MypageNavigation/>
            {account ? 
                <Routes>
                     <Route exact path="/" element={<AccountInfo/>}/>
                     <Route path="/solved-missions" element={<SolvedMissions/>}/>
                     <Route path="/my-missions" element={<MyMissions/>}/>
                 </Routes> 
            : <Login/>}
        </S.Mypage>
    );
}

export default Mypage;