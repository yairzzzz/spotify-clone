import { Router, Request, Response } from "express";
import { getAllSongs, getXsongs } from "../controller/song.controller.ts";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getXsongs);

export default router;
