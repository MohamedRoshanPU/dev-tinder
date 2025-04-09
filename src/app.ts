import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./config/database";
import { router as authRouter } from "./routes/auth";
import { router as connectionRouter } from "./routes/connection";
import { router as feedRouter } from "./routes/feed";
import { router as profileRouter } from "./routes/profile";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/connection", connectionRouter);
app.use("/api", feedRouter);
app.use("/api/user", profileRouter);

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
