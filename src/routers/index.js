import express from "express";

import userRouter from "./User/index.js";
import authRouter from "./Auth/index.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);

export default indexRouter;
