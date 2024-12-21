const isProd = import.meta.env.VITE_NODE_ENV === "production";

const config = {
    isProd,

    apiPrefix: isProd ? import.meta.env.VITE_API_PREFIX : "http://localhost:8080/api",
    apiPrefixAuth: isProd ? import.meta.env.VITE_API_PREFIX_AUTH : "http://localhost:8080/auth",
    voteDomain: isProd ? import.meta.env.VITE_VOTE_DOMAIN : "http://localhost:4000",

    SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
    SPECIAL_SECRET_URL: import.meta.env.VITE_SPECIAL_SECRET_URL,
    SPECIAL_SECRET_FORM_URL: import.meta.env.VITE_SPECIAL_SECRET_FORM_URL,
};

export default config;
