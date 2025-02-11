import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDB = async () => {
  await mongoose.connect(process.env.DB_URI);
};

export { connectToDB };
