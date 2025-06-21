import express from "express";
import cors from "cors";

import dotenv from "dotenv";

// auth router
import { userRouter } from "./http/routes/users/users";

dotenv.config();

const app = express();
// const serverAdapter = new ExpressAdapter();

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? "";

app.use(
  cors({
    origin: [FRONTEND_HOST, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/*
Configurations 
**/
// app.use(morgan("dev"));
app.use(express.json());
// app.use(cookieSession({ signed: false, secure: false }));
/*
Auth
**/
app.use(userRouter);


export { app };
