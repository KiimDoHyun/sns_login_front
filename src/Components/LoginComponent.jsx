import React from "react";
import { Button, Form, Input, Label } from "reactstrap";
import styled from "styled-components";
import logo from "../logo.svg";
import kakao from "../asset/image/kakao_login_medium_narrow.png";
import { GoogleLogin } from "@react-oauth/google";

const LoginComponent = (props) => {
    const {
        ID,
        setID,
        PW,
        setPW,
        onSubmit,
        resultMsg,
        onclickKakao,
        googleClientID,
        responseGoogle,
        onSuccessGoogleLogin,
    } = props;

    return (
        <LoginComponentBlock>
            <img src={logo} className="App-logo" alt="logo" />

            <div className="normal_Login_Area">
                <Form onSubmit={onSubmit}>
                    <div>
                        <Label>ID</Label>
                        <Input
                            value={ID}
                            onChange={({ target: { value } }) => setID(value)}
                        />
                    </div>
                    <div>
                        <Label>PW</Label>
                        <Input
                            value={PW}
                            onChange={({ target: { value } }) => setPW(value)}
                        />
                    </div>
                    <Button color="primary">Login</Button>
                </Form>
            </div>
            <div className="reulstMsg_Area">
                {resultMsg.type && (
                    <p
                        className={
                            resultMsg.type === "fail"
                                ? "resultMsg resultMsg_fail"
                                : "resultMsg resultMsg_success"
                        }
                    >
                        {resultMsg.message}
                    </p>
                )}
            </div>

            <div className="social_Login_Area">
                <div
                    className="social_Login_Button social_kakao"
                    onClick={onclickKakao}
                >
                    <img src={kakao} alt="kakao" />
                </div>
                <div>
                    <GoogleLogin
                        onSuccess={onSuccessGoogleLogin}
                        onError={responseGoogle}
                    />
                </div>
            </div>
        </LoginComponentBlock>
    );
};

const LoginComponentBlock = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;

    .normal_Login_Area form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .resultMsg {
        margin-top: 1rem;
        color: white;
    }

    .resultMsg_fail {
        color: red;
    }

    .resultMsg_success {
        color: green;
    }

    .social_Login_Area {
        margin-top: 1rem;
    }

    .social_Login_Button {
        cursor: pointer;
    }
`;
export default LoginComponent;
