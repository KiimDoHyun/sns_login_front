import React, { useState, useEffect, useRef } from "react";
import NaverLoginComponent from "../Components/NaverLoginComponent";
import { NAVER_KEY } from "../key";
import { NaverLoginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { rc_user_userInfo } from "../store/user";
import { useSetRecoilState } from "recoil";
import client from "../api/client";

const NaverLoginContainer = () => {
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);
    const { naver } = window;
    const navigate = useNavigate();
    const naverRef = useRef();

    const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_KEY.CLIENT_ID,
        callbackUrl: NAVER_KEY.CALLBAKC_URL,
        isPopup: false,
        // 버튼 타입 : 색상, 타입, 크기
        loginButton: { color: "green", type: 3, height: 40 },
        callbackHandle: true,
    });

    const handleNaverLogin = () => {
        // naverRef.current.children[0].click();
        // onSuccessNaverLogin();
    };

    const onSuccessNaverLogin = async (info) => {
        if (info) {
            try {
                const body = { ...info };
                const response = await NaverLoginApi(body);
                console.log(`res`, response);
                navigate("/home");
                rc_setUser_userInfo(response.data);
            } catch (e) {
                console.log(`error:`, e);
            }
        } else {
            console.log(`Failed Login`);
        }
    };

    const initNaverLogin = () => {
        naverLogin.init();

        console.log(`naver`, naver);
        console.log(`naverLogin`, naverLogin);

        // naverLogin.getLoginStatus(async function (status) {
        //     if (status) {
        //         onSuccessNaverLogin(naverLogin);
        //     }
        // });
    };

    // const userAccessToken = () => {
    //     window.location.href.includes("access_token") && getToken();
    // };

    // const getToken = () => {
    //     const token = window.location.href.split("=")[1].split("&")[0];
    //     console.log(`token`, token);
    // };

    // useEffect(() => {
    //     initNaverLogin();
    // }, []);

    useEffect(() => {
        const access_token = window.location.href.split("=")[1].split("&")[0];

        const getNaverData = async () => {
            try {
                const body = { access_token };
                const response = await NaverLoginApi(body);
                console.log(`res`, response);
                navigate("/home");
                rc_setUser_userInfo(response.data);
            } catch (e) {
                console.log(`error:`, e);
            }
        };
        if (access_token) {
            getNaverData();
        }
        // 토큰 가져와서
        // api 호출
        onSuccessNaverLogin();
    }, []);
    return <NaverLoginComponent />;
};

export default NaverLoginContainer;
