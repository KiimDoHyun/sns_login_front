import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginApi, GoogleLoginApi } from "../api/auth";
import LoginComponent from "../Components/LoginComponent";
import { CLIENT_ID, REDIRECT_URI, GOOGLE_KEY } from "../key";
import { useSetRecoilState } from "recoil";
import { rc_user_userInfo } from "../store/user";

const LoginContainer = () => {
    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");
    const [resultMsg, setResultMsg] = useState({ message: "", type: null });
    const navigate = useNavigate();
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const {
                data: { message, type, data },
            } = await LoginApi({ ID, PW });
            setResultMsg({ message: message || "Error", type });
            rc_setUser_userInfo(data);
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

    const onSuccessGoogleLogin = async (res) => {
        try {
            const body = { token: res.credential };
            const { data } = await GoogleLoginApi(body);

            // 등록되어있지 않은 사용자는 fail 처리
            // 회원가입페이지로 유도 해야하지만 생략함.
            rc_setUser_userInfo(data);
            navigate("/home");
            // if (data.type === "success") {
            // }
        } catch (e) {
            console.log(`res error`, res);
        }
    };

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
        onSuccessGoogleLogin,
    };
    return (
        <GoogleOAuthProvider clientId={GOOGLE_KEY.web.client_id}>
            <LoginComponent {...propDatas} />
        </GoogleOAuthProvider>
    );
};

export default LoginContainer;
