import { Types } from "mongoose";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId; // Attach userId to Request
    }
  }
}
