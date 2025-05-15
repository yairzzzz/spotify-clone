import { User } from "./../models/user.model.ts";
import { NextFunction, Response, Request } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const currentUserId = req.auth!.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });

    res.json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    next(error);
  }
};
