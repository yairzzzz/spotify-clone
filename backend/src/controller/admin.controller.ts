import { NextFunction, Request, Response } from "express";
import { Song, ISong } from "../models/song.model.ts";
import { Album, IAlbum } from "../models/album.model.ts";
import cloudinary from "../lib/cloudinary.ts";
import { UploadedFile } from "express-fileupload";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
};

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({ message: "Please upload all files" });
      return;
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // Makes sure audioFile and imageFile are not arrays of type UploadedFile[]
    if (Array.isArray(audioFile) || Array.isArray(imageFile)) {
      return res
        .status(400)
        .json({ message: "Only one file per field allowed" });
    }

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const newSong: ISong = {
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    };

    const song = await Song.create(newSong);

    // if a song belongs to an album,update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong controller", error);
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(400).json({
        message: "Could not delete the song because it doesn't exist",
      });
    }
    // if song belongs to an album,updates the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error in deleteSong controller", error);
    next(error);
  }
};

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { title, artist, releaseYear } = req.body;

    if (!title || !artist || !releaseYear) {
      return res
        .status(400)
        .json({ message: "Title, Artist and Release Year are required!" });
    }

    if (!req.files) {
      return res
        .status(400)
        .json({ message: "File was not uploaded properly" });
    }
    const imageFile = req.files.imageFile;

    // makes sure imageFile is not an array of type UploadedFile[]
    if (Array.isArray(imageFile)) {
      return res
        .status(400)
        .json({ message: "Only one file per field allowed" });
    }

    const imageUrl = await uploadToCloudinary(imageFile);

    const newAlbum: IAlbum = {
      title,
      artist,
      imageUrl,
      releaseYear,
    };

    const album = new Album(newAlbum);

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum controller");
    next(error);
  }
};

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.status(200).json({ admin: true });
};
