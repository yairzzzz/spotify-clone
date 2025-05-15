import { Router, Request, Response } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.ts";
import { getAllUsers } from "../controller/user.controller.ts";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// todo: getMessages between two users

export default router;
