import { Router, Request, Response } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);

router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);

router.delete("/albums/:id", deleteAlbum);

export default router;
