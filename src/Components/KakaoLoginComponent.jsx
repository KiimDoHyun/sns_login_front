import React from "react";
import styled, { keyframes } from "styled-components";

const KakaoLoginComponent = (props) => {
    const { message } = props;
    return (
        <KakaoLoginComponentBlock>
            <div className="loaderBox">
                <div className="loader" />
            </div>
            <h3>{message}</h3>
        </KakaoLoginComponentBlock>
    );
};

const spin = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;
const KakaoLoginComponentBlock = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    .loaderBox {
        width: 70px;
        height: 70px;
        position: relative;
        animation: ${spin} 2s 1s infinite;
    }

    .loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: #f9e000;
    }
`;
export default KakaoLoginComponent;
