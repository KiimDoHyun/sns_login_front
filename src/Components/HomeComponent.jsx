import React from "react";
import { Button, Table } from "reactstrap";
import styled from "styled-components";

const HomeComponent = (props) => {
    const {
        onClickRequestApi,
        onClickLogout,
        apiResult,
        rc_user_userInfoValue,
    } = props;

    return (
        <HomeComponentBlock>
            <div className="header">
                <h2>HomeComponent</h2>
                <Button onClick={onClickLogout}>Logout</Button>
            </div>
            {rc_user_userInfoValue && (
                <div className="body">
                    <div>
                        <div className="userInfoTable">
                            <h3>사용자 정보</h3>
                            <>
                                <div className="infoBox infoBox_Header">
                                    <div>Key</div>
                                    <div>Value</div>
                                </div>
                                <div className="infoBox infoBox_Header">
                                    <div>기본 정보</div>
                                </div>
                                <div className="infoBox">
                                    <div>type</div>
                                    <div>{rc_user_userInfoValue.type}</div>
                                </div>
                                <div className="infoBox">
                                    <div>message</div>
                                    <div>{rc_user_userInfoValue.message}</div>
                                </div>
                            </>
                            {/* 등록된 사용자 정보 */}
                            <div className="infoBox infoBox_Header">
                                <div>백엔드에 등록된 사용자 정보</div>
                            </div>
                            {rc_user_userInfoValue && (
                                <>
                                    {Object.keys(
                                        rc_user_userInfoValue.data
                                    ).map((item, idx) => (
                                        <div key={idx} className="infoBox">
                                            <div>{item} </div>
                                            <div>
                                                {
                                                    rc_user_userInfoValue.data[
                                                        item
                                                    ]
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 소셜 서비스 사용자 정보 */}
                            {rc_user_userInfoValue.data.loginType ===
                                "kakao" && (
                                <>
                                    <div className="infoBox infoBox_Header">
                                        <div>카카오 정보</div>
                                    </div>
                                    <div className="infoBox">
                                        <div>connected_at </div>
                                        <div>
                                            {
                                                rc_user_userInfoValue.socialData
                                                    .connected_at
                                            }
                                        </div>
                                    </div>
                                    <div className="infoBox">
                                        <div>id </div>
                                        <div>
                                            {
                                                rc_user_userInfoValue.socialData
                                                    .id
                                            }
                                        </div>
                                    </div>
                                    {Object.keys(
                                        rc_user_userInfoValue.socialData
                                            .kakao_account
                                    ).map(
                                        (item, idx) =>
                                            item !== "profile" && (
                                                <div
                                                    key={idx}
                                                    className="infoBox"
                                                >
                                                    <div>{item} </div>
                                                    <div>
                                                        {String(
                                                            rc_user_userInfoValue
                                                                .socialData
                                                                .kakao_account[
                                                                item
                                                            ]
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                    {Object.keys(
                                        rc_user_userInfoValue.socialData
                                            .properties
                                    ).map((item, idx) => (
                                        <div key={idx} className="infoBox">
                                            <div>{item} </div>
                                            <div>
                                                {String(
                                                    rc_user_userInfoValue
                                                        .socialData.properties[
                                                        item
                                                    ]
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 소셜 서비스 사용자 정보 */}
                            {rc_user_userInfoValue.data.loginType ===
                                "google" && (
                                <>
                                    <div className="infoBox infoBox_Header">
                                        <div>구글 정보</div>
                                    </div>
                                    {Object.keys(
                                        rc_user_userInfoValue.socialData
                                    ).map((item, idx) => (
                                        <div key={idx} className="infoBox">
                                            <div>{item} </div>
                                            <div>
                                                {String(
                                                    rc_user_userInfoValue
                                                        .socialData[item]
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 소셜 서비스 사용자 정보 */}
                            {rc_user_userInfoValue.data.loginType ===
                                "naver" && (
                                <>
                                    <div className="infoBox infoBox_Header">
                                        <div>네이버 정보</div>
                                    </div>
                                    {Object.keys(
                                        rc_user_userInfoValue.socialData
                                    ).map((item, idx) => (
                                        <div key={idx} className="infoBox">
                                            <div>{item} </div>
                                            <div>
                                                {String(
                                                    rc_user_userInfoValue
                                                        .socialData[item]
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="apiTest">
                        <h3>Api 통신 테스트</h3>
                        <Button onClick={onClickRequestApi}>Request Api</Button>
                        <div>상태: {apiResult.type}</div>
                        <div>메세지: {apiResult.message}</div>
                        <div>로그인 유형: {apiResult.data.loginType}</div>
                    </div>
                </div>
            )}
        </HomeComponentBlock>
    );
};

const HomeComponentBlock = styled.div`
    padding: 50px;
    .header {
        display: flex;
        justify-content: space-between;
        padding: 0 50px;
    }

    .body {
        display: flex;
        justify-content: space-around;
    }
    .userInfoTable {
        width: 50vw;
        margin: 0 auto;
    }
    .infoBox_Header {
        background-color: #ddd;
    }

    .infoBox_Header > div {
        width: 100% !important;
        border-left: none !important;
    }
    .infoBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid black;
        margin-top: -1px;
    }

    .infoBox div {
        word-break: break-all;
        width: 50%;
        height: 100%;
        padding: 7px;
    }
    .infoBox div:first-child {
    }

    .infoBox div:last-child {
        text-align: left;
        border-left: 1px solid black;
    }
`;
export default HomeComponent;
