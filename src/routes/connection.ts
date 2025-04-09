import express, { Request, Response } from "express";
import { authenticateUser } from "../middlewares/auth";
import { ConnectionRequestDataType } from "../types/requestBodyTypes";
import { validateConnectionRequest } from "../utils/validateConnectionRequest";
import { UserModel } from "../models/user";
import { Types } from "mongoose";
import { ConnectionRequestModel } from "../models/connection";
import { userSafeResponseData } from "../utils/constants";
import { validateUpdateConnectionRequest } from "../utils/validateUpdateConnectionRequest";

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

router.get(
  "/get-requests/:status",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const loggedInUser = req.userId;
      const { status } = req.params;
      if (!status || !["INTERESTED", "ACCEPTED"].includes(status)) {
        throw new Error("Invalid Status");
      }
      if (!loggedInUser) {
        throw new Error("User not found");
      }
      const request = await ConnectionRequestModel.find({
        toUserId: loggedInUser,
        status,
      }).populate({ path: "fromUserId", select: userSafeResponseData });

      res.json({
        message: "Successfully retrived requests",
        data: request,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

router.patch(
  "/update-request",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const { id, status } = req.body;

      validateUpdateConnectionRequest({ id, status });

      const updatedDocument = await ConnectionRequestModel.findByIdAndUpdate(
        id,
        { status },
        { returnDocument: "after" }
      );

      if (!updatedDocument) {
        res.status(404).json({ message: "Data not found" });
      }

      res.json({ message: "Successfully updated", data: updatedDocument });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
);

export { router };
