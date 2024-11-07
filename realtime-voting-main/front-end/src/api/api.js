import axios from "axios";
import config from "../services/config";

const api = axios.create({
    baseURL: config.apiUrlPrefix,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
