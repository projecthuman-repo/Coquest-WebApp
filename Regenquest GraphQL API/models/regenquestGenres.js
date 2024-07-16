const { Schema } = require("mongoose");
const { regenDb } = require("../db/connection");

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

module.exports = regenDb.model("regenquestGenres", regenquestGenresSchema);
