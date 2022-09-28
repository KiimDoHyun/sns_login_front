import client from "./client";

export const testApi = () => client.get("/api/test/test");
