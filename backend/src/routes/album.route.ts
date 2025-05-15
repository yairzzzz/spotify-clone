import { Router, Request, Response } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.ts";

const router = Router();

router.get("/", getAllAlbums);

router.get("/:albumid", getAlbumById);

export default router;
