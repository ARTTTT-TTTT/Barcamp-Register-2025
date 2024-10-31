require('dotenv').config();

const config = {
    port: process.env.PORT || "3001",
    databaseURL: process.env.DATABASE_URL || 'your_default_connection_string',
    limitVote: parseInt(process.env.LIMIT_VOTE) || 10
};

module.exports = config;