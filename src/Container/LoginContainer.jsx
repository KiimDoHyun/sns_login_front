import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginApi } from "../api/auth";
import LoginComponent from "../Components/LoginComponent";
import { CLIENT_ID, REDIRECT_URI, GOOGLE_KEY } from "../key";

const LoginContainer = () => {
    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");
    const [resultMsg, setResultMsg] = useState({ message: "", type: null });
    const navigate = useNavigate();
    const [googleTokken, setGoogleTokken] = useState({
        accessToken: null,
        refreshToken: null,
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const {
                data: { message, type },
            } = await LoginApi({ ID, PW });
            setResultMsg({ message: message || "Error", type });
            if (type === "success") {
                navigate("/home");
            }
        } catch (e) {
            setResultMsg({ message: "Error", type: null });
        }
    };

    /*
    redirect를 다시 프론트로 돌리고
    -> 받아온 인가코드를 프론트에서 백엔드로 직접 넘겨서 요청 하도록 변경 해야 함.
    */
    const onclickKakao = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    useEffect(() => {
        console.log(`googleTokken`, googleTokken);
    }, [googleTokken]);

    const propDatas = {
        ID,
        setID,
        PW,
        setPW,
        onSubmit,
        resultMsg,
        onclickKakao,
        googleClientID: GOOGLE_KEY.web.client_id,
        responseGoogle,
    };
    return (
        <GoogleOAuthProvider clientId={GOOGLE_KEY.web.client_id}>
            <LoginComponent {...propDatas} />
        </GoogleOAuthProvider>
    );
};

export default LoginContainer;
