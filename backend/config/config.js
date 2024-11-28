import dotenv from "dotenv"
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    corsOrigin: process.env.CORS_ORIGIN,
};

export default config;