import React, { useState } from "react";
import { testApi } from "../api/test";
import HomeComponent from "../Components/HomeComponent";

const HomeContainer = () => {
    const [apiResult, setApiResult] = useState({
        type: "대기",
        message: "api 요청 전",
    });
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
    };

    return <HomeComponent {...propDatas} />;
};

export default HomeContainer;
