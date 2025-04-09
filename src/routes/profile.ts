import { Request, Response, Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { UserModel } from "../models/user";
import { removeUnwantedData } from "../utils/utils";
import { safeDataToUpdateUser, userSafeResponseData } from "../utils/constants";
import { validateUserProfileUpdate } from "../utils/validateUserProfileUpdate";

const router = Router();

router.get(
  "/profile",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new Error("User not found");
      }
      const userData = await UserModel.findById(userId).select([
        "firstName",
        "lastName",
        "skills",
        "designation",
        "dateOfBirth",
        "gender",
        "email",
      ]);
      res.json({
        message: "User data retreived successfully",
        data: userData,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

router.patch(
  "/profile/update",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const updateData = req.body;
      const dataToSave = removeUnwantedData(updateData, safeDataToUpdateUser);
      validateUserProfileUpdate(dataToSave);
      if (!userId) {
        throw new Error("User not found");
      }
      const data = await UserModel.findByIdAndUpdate(userId, dataToSave, {
        returnDocument: "after",
      }).select(userSafeResponseData);
      res.json({
        message: "Profile updated successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Bad Request",
      });
    }
  }
);

export { router };
