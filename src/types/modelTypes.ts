import { ObjectId } from "mongoose";

export interface UserSchemaType {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  password: string;
}

export interface ConnectionSchemaType {
  fromUserId: ObjectId;
  toUserId: ObjectId;
  status: "INTERESTED" | "NOT_INTERESTED" | "ACCEPTED" | "REJECTED";
}
