import { Album } from "../models/album.model.ts";
import { Song } from "../models/song.model.ts";
import { User } from "../models/user.model.ts";
import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response): Promise<any> => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artists",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);
    res.status(200).json({
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {}
};
