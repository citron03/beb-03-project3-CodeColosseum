import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home, Mypage, TestList, CodeEdit } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/mypage" element={<Mypage/>} />
            <Route path="/tests" element={<TestList/>} />
            <Route path="/edit" element={<CodeEdit/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
