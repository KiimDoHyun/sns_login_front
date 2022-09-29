import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import { GoogleLoginApi } from "../api/auth";
import { GOOGLE_KEY } from "../key";
import GoogleLoginComponent from "../Components/GoogleLoginComponent";

const GoogleLoginContainer = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
    };

    const onSuccessGoogleLogin = async (res) => {
        try {
            const body = { token: res.credential };
            const response = await GoogleLoginApi(body);
            console.log(`res`, response);
            if (response.data.type === "success") {
                navigate("/home");
            }
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
