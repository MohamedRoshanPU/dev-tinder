import mongoose, { Schema } from "mongoose";
import { UserSchemaType } from "../types/modelTypes";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

const userSchema: Schema<UserSchemaType> = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String },
    age: { type: Number, max: 99 },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
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

userSchema.pre("save", async function (next) {
  let userData: UserSchemaType = this;
  userData.password = await bcrypt.hash(userData.password, 8);
  userData.age = dayjs(new Date()).diff(userData.dateOfBirth, "years");
  next();
});

// Define and export the model
const UserModel = mongoose.model<UserSchemaType>("User", userSchema);

export { UserModel };
