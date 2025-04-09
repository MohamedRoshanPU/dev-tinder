import { isValidObjectId, ObjectId } from "mongoose";

export const validateUpdateConnectionRequest = (data: {
  id: ObjectId;
  status: string;
}) => {
  const validStatuses = ["ACCEPTED", "REJECTED"];
  if (!isValidObjectId(data.id)) {
    throw new Error("Invalid User Id");
  }
  if (!validStatuses.includes(data.status)) {
    throw new Error("Invalid Status");
  }
};
