import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { KakaoLoginApi } from "../api/auth";
import KakaoLoginComponent from "../Components/KakaoLoginComponent";
import { rc_user_userInfo } from "../store/user";

const KakaoLoginContainer = () => {
    // 주소에서 코드 값을 가져온다.
    const [message, setMessage] = useState("카카오 로그인 중입니다.");
    const navigate = useNavigate();
    const rc_setUser_userInfo = useSetRecoilState(rc_user_userInfo);

    // 백엔드로 인가 코드를 넘기고 사용자 정보를 받아온다.
    /*
    성공 실패 여부

    성공하면 메인화면으로, 실패하면 다시 로그인 화면으로 || 에러 화면.

    근데 왜 렌더링이 두번 발생하는지?
    */
    useEffect(() => {
        console.log("렌더링");
    });
    useEffect(() => {
        const code = window.location.search.split("=")[1];

        // 사용자 정보를 가져와서 전역 처리.
        // 사용자 카카오 데이터: 생일, 성별, 연령대, 닉네임(카톡에 등록되어있는 이름, 프로필 사진)
        // 자세한 정보는 사업자 정보를 등록하는 비즈니스 설정이 필요함
        // 자세한 정보: 출생연도, 전화번호, 배송지정보, 카카오톡 채널 추가 상태및 내역, 성별, 연령대, 생일에 대한 필수 요청 권한 가능 (현재는 선택적 권한임.)
        const getUserInfo_Kakao = async () => {
            //
            try {
                const { data } = await KakaoLoginApi({ code });
                setMessage("카카오 로그인 정보를 확인했습니다.");
                rc_setUser_userInfo(data);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);

                // 등록되어있지 않은 사용자는 fail 처리
                // 회원가입페이지로 유도 해야하지만 생략함.
                // if (data.type === "success") {
                // }
            } catch (e) {
                setMessage(
                    "카카오 로그인에 실패했습니다. 로그인화면으로 돌아갑니다."
                );
                console.log(e);
            }
        };
        // 코드가 있으면
        if (code) {
            getUserInfo_Kakao();
        } else {
        }
    }, [navigate, rc_setUser_userInfo]);

    const propDatas = {
        message,
    };

    return <KakaoLoginComponent {...propDatas} />;
};

export default KakaoLoginContainer;
