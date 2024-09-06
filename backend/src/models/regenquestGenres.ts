import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//list of availible genres
const regenquestGenresSchema = new Schema({
  genre: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
});

export default regenDb.model("regenquestGenres", regenquestGenresSchema);
