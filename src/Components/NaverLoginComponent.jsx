import React from "react";
import styled from "styled-components";
import naver_icon from "../asset/image/naver_icon_rectangle.png";

const NaverLoginComponent = (props) => {
    const { naverRef, handleNaverLogin } = props;

    return (
        <NaverLoginComponentBlock>
            <div
                ref={naverRef}
                className="naverIdLogin"
                id="naverIdLogin"
            ></div>
            <NaverLoginBtn onClick={handleNaverLogin}>
                <img className="NaverIcon" src={naver_icon} alt="navericon" />
                <NaverLoginTitle>네이버 로그인</NaverLoginTitle>
            </NaverLoginBtn>
        </NaverLoginComponentBlock>
    );
};

export default NaverLoginComponent;

const NaverLoginComponentBlock = styled.div`
    .naverIdLogin {
        display: none;
    }
    .NaverIcon {
        width: 33px;
        height: 33px;
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
