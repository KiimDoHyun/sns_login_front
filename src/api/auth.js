import client from "./client";

export const LoginApi = (body) => client.post("/api/auth/login", body);

export const KakaoLoginApi = (body) => client.post("/api/social/kakao", body);
