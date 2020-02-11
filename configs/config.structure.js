const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SECRET_KEY_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    SECRET_KEY_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    LIFE_ACCESS_TOKEN: parseInt(process.env.JWT_ACCESS_TOKEN_LIFE),
    LIFE_REFRESH_TOKEN: parseInt(process.env.JWT_REFRESH_TOKEN_LIFE)
};