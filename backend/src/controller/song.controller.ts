import { NextFunction, Request, Response } from "express";
import { Song } from "../models/song.model";

export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getAllSongs controller", error);
    next(error);
  }
};

export const getXsongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numOfSongs: number = req.body.numOfSongs;
    // fetch 6 random songs using aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: numOfSongs },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json(songs);
  } catch (error) {
    console.log("Error in getFeaturedSongs", error);
    next(error);
  }
};
