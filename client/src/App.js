import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home, Mypage, MissionList, CodeEdit, RegisterMission, MissionDetail, Feedback } from './pages';
import Notification from "./components/Notification";
import { useLogin } from "./utils/login";

const queryClient = new QueryClient();

function App() {
  useLogin();
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
