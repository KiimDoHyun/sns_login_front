import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const AxiosSetting = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("엑시오스 세팅");
        client.interceptors.request.use(
            (config) => {
                return config;
            },

            (error) => {
                return Promise.reject(error);
            }
        );

        // 백엔드 응답 직후
        client.interceptors.response.use(
            // 요청 성공
            (config) => {
                return config;
            },
            // 요청 실패

            (error) => {
                // 그냥 백엔드로부터 사용자 인증이 실패하는 경우만 체크하면 될듯.
                console.log(error);
                //토큰이 만료된 경우.
                // 로그인 화면으로 돌림.
                if (error.response.data.type === "token expired") {
                    alert("로그인이 만료되어 로그인 화면으로 이동합니다.");
                    navigate("/");
                }

                return Promise.reject(error);
            }
        );
    }, []);
    return null;
};

export default AxiosSetting;
