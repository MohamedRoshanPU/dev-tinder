import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Authentication failed");
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    _id && (req.userId = _id);
    next();
  } catch (error) {
    res.status(401).json({
      error: error.message ? error.message : "Something went wrong!",
    });
  }
};
