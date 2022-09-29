import React, { useState, useEffect } from "react";
import NaverLoginComponent from "../Components/NaverLoginComponent";
import { NaverLoginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { rc_user_userInfo } from "../store/user";
import { useSetRecoilState } from "recoil";

const NaverLoginContainer = () => {
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);
    const navigate = useNavigate();
    const [message, setMessage] = useState("네이버 로그인 중입니다.");

    useEffect(() => {
        const access_token = window.location.href.split("=")[1].split("&")[0];

        const getNaverData = async () => {
            try {
                const body = { access_token };
                const response = await NaverLoginApi(body);
                setMessage("네이버 로그인 정보를 확인했습니다.");
                rc_setUser_userInfo(response.data);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } catch (e) {
                setMessage(
                    "네이버 로그인에 실패했습니다. 로그인화면으로 돌아갑니다."
                );
                console.log(`error:`, e);
            }
        };
        if (access_token) {
            getNaverData();
        }
        // 토큰 가져와서
        // api 호출
        // onSuccessNaverLogin();
    }, [navigate, rc_setUser_userInfo]);

    const propDatas = {
        message,
    };
    return <NaverLoginComponent {...propDatas} />;
};

export default NaverLoginContainer;
