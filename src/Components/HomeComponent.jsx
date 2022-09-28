import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const HomeComponent = (props) => {
    const { onClickRequestApi, onClickLogout, apiResult } = props;
    return (
        <HomeComponentBlock>
            HomeComponent
            <Button onClick={onClickLogout}>Logout</Button>
            <div>
                <h3>Api 통신 테스트</h3>
                <Button onClick={onClickRequestApi}>Request Api</Button>
                <div>상태: {apiResult.type}</div>
                <div>메세지: {apiResult.message}</div>
            </div>
        </HomeComponentBlock>
    );
};

const HomeComponentBlock = styled.div``;
export default HomeComponent;
