const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:6060",
            changeOrigin: true,
        })
    );
    //kauth.kakao.com/oauth

    https: app.use(
        "/oauth",
        createProxyMiddleware({
            target: "https://kauth.kakao.com",
            changeOrigin: true,
            // pathRewrite: {
            //     '^/kakaoPAY': '/v1' // ^/kakaoPAY -> /v1 으로 변경
            // }
        })
    );
};
