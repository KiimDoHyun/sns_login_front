import React, { useState, useEffect, useRef } from "react";
import NaverLoginComponent from "../Components/NaverLoginComponent";
import { NAVER_KEY } from "../key";
import { NaverLoginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { rc_user_userInfo } from "../store/user";
import { useSetRecoilState } from "recoil";

const NaverLoginContainer = () => {
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);
    const { naver } = window;
    const navigate = useNavigate();
    const naverRef = useRef();

    const handleNaverLogin = () => {
        //naverRef.current.children[0].click();
        initNaverLogin();
        userAccessToken();
    };

    const onSuccessNaverLogin = async (info) => {
        if (info) {
            try {
                const body = { ...info };
                const response = await NaverLoginApi(body);
                console.log(`res`, response);
                navigate("/home");
                //rc_setUser_userInfo(response.data);
            } catch (e) {
                console.log(`error:`, e);
            }
        } else {
            console.log(`Failed Login`);
        }
    };

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

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                onSuccessNaverLogin(naverLogin);
            }
        });
    };

    const userAccessToken = () => {
        window.location.href.includes("access_token") && getToken();
    };

    const getToken = () => {
        const token = window.location.href.split("=")[1].split("&")[0];
        console.log(`token`, token);
    };

    const propDatas = {
        naverRef,
        handleNaverLogin,
    };

    return <NaverLoginComponent {...propDatas} />;
};

export default NaverLoginContainer;
