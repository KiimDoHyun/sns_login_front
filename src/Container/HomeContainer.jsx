import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../api/auth";
import { testApi } from "../api/test";
import HomeComponent from "../Components/HomeComponent";

const HomeContainer = () => {
    const [apiResult, setApiResult] = useState({
        type: "대기",
        message: "api 요청 전",
    });
    const navigate = useNavigate();
    const onClickLogout = async () => {
        try {
            const { data } = await LogoutApi();
            if (data.type === "logout_success") {
                alert("로그인 화면으로 이동합니다.");
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    };

    // api 요청.
    const onClickRequestApi = async () => {
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

    const propDatas = {
        onClickRequestApi,
        apiResult,
        onClickLogout,
    };

    return <HomeComponent {...propDatas} />;
};

export default HomeContainer;
