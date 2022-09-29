import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogoutApi } from "../api/auth";
import { testApi } from "../api/test";
import HomeComponent from "../Components/HomeComponent";
import { googleLogout } from "@react-oauth/google";
import { rc_user_userInfo } from "../store/user";

const HomeContainer = () => {
    const [count, setCount] = useState(0);
    const [apiResult, setApiResult] = useState({
        type: "대기",
        message: "api 요청 전",
        data: {
            loginType: "대기",
        },
    });
    const rc_user_userInfoValue = useRecoilValue(rc_user_userInfo);
    const navigate = useNavigate();
    const onClickLogout = async () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            googleLogout();
            try {
                const { data } = await LogoutApi();
                if (data.type === "logout_success") {
                    alert("로그인 화면으로 이동합니다.");
                    navigate("/");
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    // api 요청.
    const onClickRequestApi = async () => {
        setCount(count + 1);
        try {
            const { data } = await testApi();
            setApiResult(data);
        } catch (e) {
            setApiResult({
                type: "fail",
                message: "통신 에러가 발생했습니다.",
            });
        }
    };

    useEffect(() => {
        console.log("rc_user_userInfoValue :", rc_user_userInfoValue);
    }, [rc_user_userInfoValue]);

    const propDatas = {
        onClickRequestApi,
        apiResult,
        onClickLogout,
        rc_user_userInfoValue,
        count,
    };

    return <HomeComponent {...propDatas} />;
};

export default HomeContainer;
