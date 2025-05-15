import mongoose, { Types } from "mongoose";

export interface IAlbum {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const albumSchema = new mongoose.Schema<IAlbum>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
