import { Types } from "mongoose";

export interface ConnectionRequestDataType {
  id: Types.ObjectId;
  status: "INTERESTED" | "NOT_INTERESTED";
}
