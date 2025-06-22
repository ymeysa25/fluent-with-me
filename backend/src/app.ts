import express from "express";
import cors from "cors";

import dotenv from "dotenv";

// auth router
import { userRouter } from "./http/routes/users/users";
import { languageRouter } from "./http/routes/languages/languages";
import { wordCategoryRouter } from "./http/routes/word_categories/word_categories";
import { wordRouter } from "./http/routes/words/words";

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
user
**/
app.use(userRouter);


/*
language
**/
app.use(languageRouter);



/*
word category
**/
app.use(wordCategoryRouter);


/*
word
**/
app.use(wordRouter);

export { app };
