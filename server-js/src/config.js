require("dotenv").config();
const isProduction = process.env.PRODUCTION === "true";

const config = {
    port: process.env.PORT || "8080",
    databaseURI: process.env.DATABASE_URL || "",
    limitVote: parseInt(process.env.LIMIT_VOTE) || 10,
    client_url: isProduction ? process.env.CLIENT_URL : "http://localhost:3000/register",
    SPECIAL_SECRET_URL: process.env.SPECIAL_SECRET_URL,
    SPECIAL_SECRET_FORM_URL: process.env.SPECIAL_SECRET_FORM_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_REDIRECT_URI: isProduction ? process.env.GOOGLE_CLIENT_REDIRECT_URI : "http://localhost:8080",
};

module.exports = config;
