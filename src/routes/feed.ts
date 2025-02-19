import { Request, Response, Router } from "express";
import { authenticateUser } from "../middlewares/auth";

const router = Router();

router.get("/feed", authenticateUser, async (req: Request, res: Response) => {
  res.json({
    message: "working",
  });
});

export { router };
