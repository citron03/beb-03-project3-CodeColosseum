import S from "./Mypage.styled";
import { AccountInfo, SolvedMissions, MyMissions, MypageNavigation } from "../../components/Mypage";
import { Route, Routes } from "react-router-dom";

const Mypage = () => {
    return (
        <S.Mypage>
            <MypageNavigation/>
            <Routes>
                <Route exact path="/" element={<AccountInfo/>}/>
                <Route path="/solved-missions" element={<SolvedMissions/>}/>
                <Route path="/my-missions" element={<MyMissions/>}/>
            </Routes>
        </S.Mypage>
    );
}

export default Mypage;