import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

// name: name of the topic
const topicSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const Topic = regenDb.model("Topic", topicSchema);
