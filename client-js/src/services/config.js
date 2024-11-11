const isProd = import.meta.env.VITE_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? "/api" : import.meta.env.VITE_API_PREFIX,
    apiPrefixAuth: isProd ? "/auth" : import.meta.env.VITE_API_PREFIX_AUTH,
    voteDomain: isProd ? import.meta.env.VITE_VOTE_DOMAIN : "http://localhost:4000",
    SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
    SPECIAL_SECRET_URL: import.meta.env.VITE_SPECIAL_SECRET_URL,
    SPECIAL_SECRET_FORM_URL: import.meta.env.VITE_SPECIAL_SECRET_FORM_URL,
};

export default config;
