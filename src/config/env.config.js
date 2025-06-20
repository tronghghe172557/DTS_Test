const config = {
  app: {
    port: process.env.NODE_PORT || 3000,
  },
  db: {
    host: process.env.MONGO_HOST || "localhost",
    port: parseInt(process.env.MONGO_PORT) || 27017, 
    name: process.env.MONGO_DB_NAME || "DTS_Test",
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  },
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET || "access_secret_default",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "refresh_secret_default",
    expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    expiresRefreshIn: process.env.JWT_EXPIRES_REFRESH_IN || "7d",
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USER || "default",
    password: process.env.REDIS_PASSWORD || "",
  },
};

export default config;