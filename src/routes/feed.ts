import { Request, Response, Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { UserModel } from "../models/user";
import { ConnectionRequestModel } from "../models/connection";

const router = Router();

router.get("/feed", authenticateUser, async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.userId;
    const excludedUsers = await ConnectionRequestModel.find({
      fromUserId: loggedInUser,
    }).distinct("toUserId");
    const potentialMatches = await UserModel.find({
      _id: { $nin: [loggedInUser, ...excludedUsers] },
    }).select(["-password", "-__v"]);
    res.json({
      message: "Successfully retrieved fields",
      data: potentialMatches,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Bad Request",
    });
  }
});

export { router };
