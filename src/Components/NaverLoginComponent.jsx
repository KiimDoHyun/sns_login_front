import React from "react";
import styled from "styled-components";

const NaverLoginComponent = (props) => {
    const { naverRef, handleNaverLogin } = props;

    return (
        <NaverLoginComponentBlock>
            <div className="naverIdLogin" id="naverIdLogin"></div>
            <div className="NaverLoginBtn" onClick={handleNaverLogin}>
                <div className="NaverIcon" alt="navericon" />
                <div className="NaverLogintitle">네이버로 로그인</div>
            </div>
        </NaverLoginComponentBlock>
    );
};

export default NaverLoginComponent;

const NaverLoginComponentBlock = styled.div`
    .naverIdLogin {
        display: none;
    }
    .NaverLoginBtn {
        display: flex;
        align-items: center;
        width: 150px;
        height: 56;
        background-color: #03c75a;
        border-radius: 6px;
    }

    .NaverIcon {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        background: url("/images/Login/navericon.png") no-repeat center;
        background-size: 30px;
    }

    .NaverLoginTitle {
        margin-left: 90px;
        color: ${({ theme }) => theme.White};
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
    }
`;
