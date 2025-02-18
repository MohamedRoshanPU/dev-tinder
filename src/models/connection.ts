import mongoose, { Schema, Model, Types } from "mongoose";
import { ConnectionSchemaType } from "../types/modelTypes";

const connectionRequestSchema = new Schema<ConnectionSchemaType>(
  {
    fromUserId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["INTERESTED", "NOT_INTERESTED", "ACCEPTED", "REJECTED"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = mongoose.model<ConnectionSchemaType>(
  "Connection",
  connectionRequestSchema
);

export { connectionRequestSchema, ConnectionRequestModel };
