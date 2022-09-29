import client from "./client";

export const LoginApi = (body) => client.post("/api/auth/login", body);
export const LogoutApi = () => client.get("/api/auth/logout");

export const KakaoLoginApi = (body) => client.post("/api/social/kakao", body);
export const GoogleLoginApi = (body) => client.post("/api/social/google", body);
export const NaverLoginApi = (body) => client.post("/api/social/naver", body);
