import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home, Mypage, MissionList, CodeEdit, RegisterMission, MissionDetail, Feedback } from './pages';
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccount } from "./redux/reducer/accountSlice";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if(isLogin){
      dispatch(fetchAccount());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
        <Header/>
        <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/mypage" element={<Mypage/>} />
              <Route path="/missions" element={<MissionList/>} />
              <Route path="/mission/:id" element={<MissionDetail/>} />
              <Route path="/feedback/:id" element={<Feedback/>} />
              <Route path="/edit" element={<CodeEdit/>} />
              <Route path="/register" element={<RegisterMission/>} />
        </Routes>
        <Footer/>
        <Notification/>
    </BrowserRouter>
  );
}

export default App;
