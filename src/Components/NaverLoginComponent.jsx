import React from "react";
import styled from "styled-components";
import naver_icon from "../asset/image/naver_icon_rectangle.png";

const NaverLoginComponent = () => {
    return (
        <div>
            <div className="loaderBox">
                <div className="loader" />
            </div>
            <h3>{"네이버 로그인중입니다."}</h3>
        </div>
    );
    // return <div id="naverIdLogin" onClick={handleNaverLogin}></div>;
};

export default NaverLoginComponent;

const NaverLoginComponentBlock = styled.div`
    .NaverIcon {
        margin-left: 1px;
        width: 30px;
        height: 30px;
    }
`;

const NaverLoginBtn = styled.button`
    display: flex;
    align-items: center;
    width: 208px;
    height: 40px;
    background-color: #03c75a;
    border: solid 1px #d2e3fc;
    border-radius: 5px;
`;

const NaverLoginTitle = styled.span`
    //color: ${({ theme }) => theme.White};
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
`;
