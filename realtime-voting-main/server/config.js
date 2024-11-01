require('dotenv').config();

const config = {
    port: process.env.PORT || "3001",
    databaseURI: process.env.DATABASE_URL || '',
    limitVote: parseInt(process.env.LIMIT_VOTE) || 10
};

module.exports = config;