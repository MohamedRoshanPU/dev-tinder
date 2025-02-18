import mongoose, { Schema } from "mongoose";
import { UserSchemaType } from "../types/modelTypes";

const userSchema: Schema<UserSchemaType> = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String },
    age: { type: Number, required: true, max: 99 },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define and export the model
const UserModel = mongoose.model<UserSchemaType>("User", userSchema);

export { UserModel };
