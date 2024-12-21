require("dotenv").config();

const config = {
    port: process.env.PORT || "8080",
    databaseURI: process.env.DATABASE_URL || "",
    limitVote: parseInt(process.env.LIMIT_VOTE) || 10,
    client_url: process.env.PRODUCTION ? process.env.CLIENT_URL : "http://localhost:3000/register",
    //client_url: process.env.PRODUCTION ? "http://localhost:3000/register" : "http://localhost:3000/register",
};

module.exports = config;
