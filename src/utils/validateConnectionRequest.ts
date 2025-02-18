import { isValidObjectId, Types } from "mongoose";
import { ConnectionRequestDataType } from "../types/requestBodyTypes";

const ALLOWED_STATUSES = ["INTERESTED", "NOT_INTERESTED"];

export const validateConnectionRequest = (
  loggedInUserId: Types.ObjectId,
  data: ConnectionRequestDataType
) => {
  if (!isValidObjectId(data.id) || !isValidObjectId(loggedInUserId)) {
    throw new Error("Invalid id. Please confirm");
  }
  if (loggedInUserId.equals(data.id)) {
    throw new Error("You can't send request to yourself!");
  }
  if (!ALLOWED_STATUSES.includes(data.status)) {
    throw new Error("Invalid status type. Please confirm");
  }
};
