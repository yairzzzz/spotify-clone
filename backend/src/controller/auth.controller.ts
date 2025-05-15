import { NextFunction } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Request, Response } from "express";
import { User, IUser } from "../models/user.model.ts";
import formatFullname from "../lib/formatFullname.ts";

export const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, firstName, lastName, imageUrl } = req.body;

  try {
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      const newUser: IUser = new User({
        clerkId: id,
        fullName: formatFullname(firstName, lastName),
        imageUrl,
      });
      await User.create(newUser);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
