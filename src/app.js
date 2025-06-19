import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import Database from './dbs/init.mongodb.js';

const app = express();
app.use(morgan("dev")); // Logging middleware
app.use(helmet()); // Security middleware
app.use(compression()); // Compression middleware
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded parsing middleware
configDotenv()

// DB config
const _ = Database.getInstance();

// Init routes
app.get("/", (req, res) => {
    res.send("Hello, Trong!");
})

// Func middleware to handle errors

export default app;