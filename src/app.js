import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import indexRouter from "./routers/index.js";
import mongodb from "./dbs/init.mongodb.js";
import redis from "./dbs/init.redis.js";

const app = express();
app.use(morgan("dev")); // Logging middleware
app.use(helmet()); // Security middleware
app.use(compression()); // Compression middleware
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded parsing middleware
configDotenv();

// DB conf

// Init routes
app.use("/v1/api", indexRouter);

// func handle error
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(`stack: ${error.stack}`);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error in app",
  });
});

export default app;
