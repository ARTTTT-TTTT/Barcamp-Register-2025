const isProduction = import.meta.env.VITE_PRODUCTION === "true";

const config = {
    apiPrefix: isProduction ? import.meta.env.VITE_API_PREFIX : "http://localhost:8080/api",
    apiPrefixAuth: isProduction ? import.meta.env.VITE_API_PREFIX_AUTH : "http://localhost:8080/auth",
    voteDomain: isProduction ? import.meta.env.VITE_VOTE_DOMAIN : "http://localhost:4000",

    SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
    SPECIAL_SECRET_URL: import.meta.env.VITE_SPECIAL_SECRET_URL,
    SPECIAL_SECRET_FORM_URL: import.meta.env.VITE_SPECIAL_SECRET_FORM_URL,
};

export default config;
