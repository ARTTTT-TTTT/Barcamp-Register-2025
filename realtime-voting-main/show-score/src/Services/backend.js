import axios from "axios";
import config from "../config";

const backend = axios.create({
  baseURL: config.apiUrlPrefix,
  headers: {
    "Content-Type": "application/json",
  },
});

export default backend