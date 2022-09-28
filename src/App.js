import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoLoginPage from "./Page/KakaoLoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoginPage />} path={"/"} />
                <Route element={<KakaoLoginPage />} path={"/kakaologin"} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
