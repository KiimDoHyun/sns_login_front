import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import { GoogleLoginApi } from "../api/auth";
import { GOOGLE_KEY } from "../key";
import GoogleLoginComponent from "../Components/GoogleLoginComponent";
import { rc_user_userInfo } from "../store/user";
import { useSetRecoilState } from "recoil";

const GoogleLoginContainer = () => {
    const navigate = useNavigate();
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);

    const responseGoogle = (response) => {
        console.log(response);
    };

    const onSuccessGoogleLogin = async (res) => {
        try {
            const body = { token: res.credential };
            const response = await GoogleLoginApi(body);
            console.log(`res`, response);
            navigate("/home");
            rc_setUser_userInfo(response.data);
        } catch (e) {
            console.log(`res error`, res);
        }
    };

    const propDatas = {
        googleClientID: GOOGLE_KEY.web.client_id,
        responseGoogle,
        onSuccessGoogleLogin,
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_KEY.web.client_id}>
            <GoogleLoginComponent {...propDatas} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginContainer;
