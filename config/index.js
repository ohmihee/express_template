import dotenv from "dotenv";
dotenv.config();

export default {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    appName: process.env.APP_NAME || "server-init",
    env: process.env.NODE_ENV || "development",
  },
  db: {
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "mydb",
    password: process.env.DB_PASS || "password",
    username: process.env.DB_USER || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: true,
  },
  mysql: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "server_init",
    multipleStatements: true,
    connectionLimit: 100,
  },
  winiston: {
    logpath: "/logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1d",
    saltRounds: process.env.SALT_ROUND || 10,
    refresh_token_secret:
      process.env.REPRESH_TOKEN_SECRET || "asdfasdfasdfasdf",
    refresh_token_expiresin: process.env.REPRESH_TOKEN_EXPIRESIN || "2d",
  },
  sendgrid: {
    sendgrid_id: process.env.SENDGRID_ID,
    sendgrid_key: process.env.SENDGRID_KEY,
  },
};
