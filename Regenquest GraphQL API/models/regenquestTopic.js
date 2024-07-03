const { Schema } = require("mongoose");
const { regenDb } = require("../db/connection");

// name: name of the topic
const regenquestTopicSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = regenDb.model("regenquestTopic", regenquestTopicSchema);
