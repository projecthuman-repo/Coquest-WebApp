const { Schema } = require("mongoose");
const { regenDb } = require("../db/connection");

// name: name of the motive
const regenquestMotiveSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = regenDb.model("regenquestMotive", regenquestMotiveSchema);
