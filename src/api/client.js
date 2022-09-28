import axios from "axios";

const client = axios.create({
    timeout: 10_000,
});

export default client;
