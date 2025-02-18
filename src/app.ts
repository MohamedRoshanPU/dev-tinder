import express from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/database";
import { router as authRouter } from "./routes/auth";
import { router as connectionRouter } from "./routes/connection";
const app = express();

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/connection", connectionRouter);

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
