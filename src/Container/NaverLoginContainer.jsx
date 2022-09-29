import React, { useState, useEffect } from "react";
import NaverLoginComponent from "../Components/NaverLoginComponent";
import { NAVER_KEY } from "../key";
import { NaverLoginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { rc_user_userInfo } from "../store/user";
import { useSetRecoilState } from "recoil";

const NaverLoginContainer = () => {
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);
    const { naver } = window;
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

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
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_KEY.CLIENT_ID,
            callbackUrl: NAVER_KEY.CALLBAKC_URL,
            isPopup: false,
            // 버튼 타입 : 색상, 타입, 크기
            loginButton: { color: "green", type: 3, height: 58 },
            callbackHandle: true,
        });
        naverLogin.init();

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                setUserInfo(naverLogin);
            }
        });
        console.log(`userInfo`, userInfo);

        onSuccessNaverLogin(userInfo);
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
