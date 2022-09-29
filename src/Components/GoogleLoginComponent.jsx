import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = (props) => {
    const { responseGoogle, onSuccessGoogleLogin } = props;

    return (
        <GoogleLogin
            onSuccess={onSuccessGoogleLogin}
            onError={responseGoogle}
        />
    );
};

export default GoogleLoginComponent;
