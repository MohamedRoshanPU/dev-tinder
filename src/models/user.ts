import mongoose, { Schema, Document, Model } from "mongoose";
import validator, { isEmail, isStrongPassword } from "validator";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String },
    age: { type: Number, required: true, max: 99 },
    gender: {
      type: String,
      required: true,
      validate: (value: string) => {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: (value: string) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: (value: "string") => {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define and export the model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { UserModel };
