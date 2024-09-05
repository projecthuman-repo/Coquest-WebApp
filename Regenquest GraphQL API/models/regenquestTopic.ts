import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

// name: name of the topic
const regenquestTopicSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default regenDb.model("regenquestTopic", regenquestTopicSchema);
