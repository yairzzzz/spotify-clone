import { Router, Request, Response } from "express";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { getStats } from "../controller/stats.controller";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;
