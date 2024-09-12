import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//list of availible genres
const genreSchema = new Schema({
  genre: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
});

export const Genre = regenDb.model("Genre", genreSchema);
