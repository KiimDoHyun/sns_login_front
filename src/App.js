import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoLoginPage from "./Page/KakaoLoginPage";
import HomePage from "./Page/HomePage";
import AxiosSetting from "./setting/AxiosSetting";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        console.log("App 렌더링");
    });
    return (
        <BrowserRouter>
            <AxiosSetting />
            <Routes>
                <Route element={<LoginPage />} path={"/"} />
                <Route element={<KakaoLoginPage />} path={"/kakaologin"} />
                <Route element={<HomePage />} path={"/home"} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
