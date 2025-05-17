import { NextFunction, Request, Response } from "express";
import { Album } from "../models/album.model";

export const getAllAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error in getAllAlbums controller", error);
    next(error);
  }
};

export const getAlbumById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    Bundel.findById(userId);

    const album = await Album.findById(id).populate("songs");

    if (!album) {
      res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    console.log("Error in getAlbumById Controller", error);
    next(error);
  }
};
