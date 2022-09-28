import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoLoginPage from "./Page/KakaoLoginPage";
import HomePage from "./Page/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoginPage />} path={"/"} />
                <Route element={<KakaoLoginPage />} path={"/kakaologin"} />
                <Route element={<HomePage />} path={"/home"} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
