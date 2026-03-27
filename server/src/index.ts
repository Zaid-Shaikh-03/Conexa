import cookieParser from "cookie-parser";
import "dotenv/config"
import express, { type Request, type Response } from "express";
import cors from "cors";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: Env.FRONTEND_ORIGIN,
        credentials: true
    })
)

app.get("/health", asyncHandler(async(req:Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
        message: "Server is healthy",
        status: "Ok"
    })
}))

app.listen(Env.PORT, () => {
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})