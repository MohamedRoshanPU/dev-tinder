import express, { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth";
import { connectToDB } from "./config/database";
const app = express();

connectToDB()
  .then(() => {
    console.log("DB Connection Successfull");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error Connecting to Database : ${error}`);
  });
