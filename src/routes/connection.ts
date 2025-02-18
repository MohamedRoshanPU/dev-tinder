import express, { Request, Response } from "express";
import { authenticateUser } from "../middlewares/auth";
import { ConnectionRequestDataType } from "../types/requestBodyTypes";
import { validateConnectionRequest } from "../utils/validateConnectionRequest";
import { UserModel } from "../models/user";
import { Types } from "mongoose";
import { ConnectionRequestModel } from "../models/connection";

const router = express.Router();

router.post(
  "/send-request",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const loggedInUserId = new Types.ObjectId(req.userId);
      const data: ConnectionRequestDataType = req.body;
      validateConnectionRequest(loggedInUserId, data);
      const toUser = await UserModel.findById(data.id);
      if (!toUser) {
        throw new Error("User doesn't exist!");
      }
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        fromUserId: loggedInUserId,
        toUserId: data.id,
      });

      if (existingConnectionRequest) {
        throw new Error(
          `You have already send request to ${toUser.firstName} ${toUser.lastName}`
        );
      }

      const connectionRequestData = new ConnectionRequestModel({
        fromUserId: loggedInUserId,
        toUserId: data.id,
        status: data.status,
      });
      await connectionRequestData.save();
      res.status(200).json({
        message: `You have successfully send a request to ${toUser.firstName} ${toUser.lastName}`,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

export { router };
