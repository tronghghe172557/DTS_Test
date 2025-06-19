// lv0
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_POST || 27017,
    name: process.env.DEV_DB_NAME || "DTS_Test",
  },
  jwt: {
    access_secret: process.env.DEV_JWT_ACCESS_SECRET || "your_dev_jwt_secret",
    refresh_secret: process.env.DEV_JWT_REFRESH_SECRET || "your_dev_jwt_secret",
    expiresIn: process.env.DEV_JWT_EXPIRES_IN || "1h",
  }
};

export default dev ;
