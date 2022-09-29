import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../api/auth";
import LoginComponent from "../Components/LoginComponent";
import { useSetRecoilState } from "recoil";
import { rc_user_userInfo } from "../store/user";
import { CLIENT_ID, NAVER_KEY, REDIRECT_URI } from "../key";

const LoginContainer = () => {
    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");
    const [resultMsg, setResultMsg] = useState({ message: "", type: null });
    const navigate = useNavigate();
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);
    const { naver } = window;

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

    // 네이버 설정
    useEffect(() => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_KEY.CLIENT_ID,
            callbackUrl: NAVER_KEY.CALLBAKC_URL,
            isPopup: false,
            // 버튼 타입 : 색상, 타입, 크기
            loginButton: { color: "green", type: 3, height: 45 },
            callbackHandle: true,
        });

        naverLogin.init();
    }, [naver.LoginWithNaverId]);

    const propDatas = {
        ID,
        setID,
        PW,
        setPW,
        onSubmit,
        resultMsg,
        onclickKakao,
    };
    return <LoginComponent {...propDatas} />;
};

export default LoginContainer;
