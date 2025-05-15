import { clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const protectRoute = async (req: any, res: any, next: any) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }

  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth!.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
