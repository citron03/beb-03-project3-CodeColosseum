import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./GlobalStyle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home, Mypage, MissionList, CodeEdit, RegisterMission, MissionDetail, Feedback } from './pages';
import { Loading, Notification, SignUp, DisappearingNotification } from "./components/Modals";
import { useLogin } from "./utils/login";

const queryClient = new QueryClient();

function App() {
  useLogin();
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header/>
          <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/mypage/*" element={<Mypage/>}/>
                <Route path="/missions" element={<MissionList isColosseum={true}/>}/>
                <Route path="/practice" element={<MissionList isColosseum={false}/>}/>
                <Route path="/mission/:id" element={<MissionDetail/>}/>
                <Route path="/feedback/:id" element={<Feedback/>}/>
                <Route path="/edit" element={<CodeEdit/>}/>
                <Route path="/register" element={<RegisterMission/>}/>
          </Routes>
          <Footer/>
          <Notification/>
          <Loading/>
          <SignUp/>
          <DisappearingNotification/>
        </QueryClientProvider>
        <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
