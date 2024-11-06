const isProd = import.meta.env.VITE_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? "/api" : import.meta.env.VITE_API_PREFIX,
    apiPrefixAuth: isProd ? "/auth" : import.meta.env.VITE_API_PREFIX_AUTH,
};

export default config;
