import S from "./Mypage.styled";
import { AccountInfo, Callenges, MyMissions, MypageNavigation } from "../../components/Mypage";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Login from "../../components/Login";
import { useQuery } from 'react-query';
import { useRefreshLogin } from "../../utils/login";

const Mypage = () => {

    const state = useSelector(state => state.signup);
    useRefreshLogin();

    const { data } = useQuery([state?.account?._id], async () => {
        return axios.get(`/user/mypage/${state?.account?._id}`)
                .then(el => el.data)
                .catch(err => err);
    }, {enabled: !!state?.account?._id});

    return (
        <S.Mypage>
            <MypageNavigation/>
            {state?.account ? 
                <Routes>
                     <Route exact path="/" element={<AccountInfo data={state?.account}/>}/>
                     <Route path="/solved-missions" element={<Callenges userCallenges={data?.data?.userCallenges}/>}/>
                     <Route path="/my-missions" element={<MyMissions userCreatedMissions={data?.data?.userCreatedMissions}/>}/>
                 </Routes> 
            : <Login/>}
        </S.Mypage>
    );
}

export default Mypage;