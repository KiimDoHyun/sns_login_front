import React, { useState, useEffect } from "react";
import NaverLoginComponent from "../Components/NaverLoginComponent";
import { NAVER_KEY } from "../key";

const NaverLoginContainer = () => {
    const { naver } = window;
    const [userInfo, setUserInfo] = useState();

    const initNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_KEY.CLIENT_ID,
            callbackUrl: NAVER_KEY.CALLBAKC_URL,
            isPopup: false,
            // 버튼 타입 : 색상, 타입, 크기
            loginButton: { color: "green", type: 3, height: 58 },
            callbackHandle: true,
        });
        naverLogin.init();
        console.log(`naverLogin`, naverLogin);

        naverLogin.getLoginStatus(async (status) => {
            if (status) {
                setUserInfo(naverLogin.user);
            }
        });
        console.log(`userInfo`, userInfo);
    };

    const userAccessToken = () => {
        window.location.href.includes("access_token") && getToken();
    };

    const getToken = () => {
        const token = window.location.href.split("=")[1].split("&")[0];
        console.log(`token`, token);
    };

    useEffect(() => {
        initNaverLogin();
        userAccessToken();
    }, []);

    return <NaverLoginComponent />;
};

export default NaverLoginContainer;
