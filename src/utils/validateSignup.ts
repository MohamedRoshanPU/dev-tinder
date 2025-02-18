import { Request } from "express";
import validator from "validator";

export const validateSignup = (request: Request) => {
  const data = request.body;
  const validGenders = ["male", "female", "others"];
  if (!validGenders.includes(data.gender)) {
    throw new Error("Please enter a valid gender");
  }
  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Please enter a strong password");
  }
  if (!validator.isEmail(data.email)) {
    throw new Error("Please enter a valid email");
  }
};
