import { InferSchemaType, Schema } from "mongoose";
import { regenDb } from "../../db/connection";

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

export type GenreSchemaType = InferSchemaType<typeof genreSchema>;
export const Genre = regenDb.model("Genre", genreSchema);
