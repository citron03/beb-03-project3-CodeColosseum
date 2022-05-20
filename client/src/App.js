import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./GlobalStyle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home, Mypage, MissionList, RegisterMission, MissionDetail, Feedback, About } from './pages';
import { Loading, Notification, SignUp, DisappearingNotification } from "./components/Modals";
import { useLogin } from "./utils/login";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function App() {
  useLogin();
  const isDarkMode = useSelector(state => state.darkMode).isDarkMode;
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header/>
          <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/mypage/*" element={<Mypage/>}/>
                <Route path="/missions" element={<MissionList isColosseum={true}/>}/>
                <Route path="/practice" element={<MissionList isColosseum={false}/>}/>
                <Route path="/mission/colosseum/:id" element={<MissionDetail isColosseum={true}/>}/>
                <Route path="/mission/:id" element={<MissionDetail isColosseum={false}/>}/>
                <Route path="/feedback/:id" element={<Feedback/>}/>
                <Route path="/register" element={<RegisterMission/>}/>
                <Route path="/about" element={<About/>}/>
          </Routes>
          <Footer/>
          <Notification/>
          <Loading/>
          <SignUp/>
          <DisappearingNotification/>
        </QueryClientProvider>
        <GlobalStyle isDarkMode={isDarkMode}/>
    </BrowserRouter>
  );
}

export default App;
