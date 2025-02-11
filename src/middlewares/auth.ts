import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;
  try {
    if (token !== "abc") {
      res.status(401).json({
        status: 401,
        message: "Unauthorized user, Please login again!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
