import { Schema } from "mongoose";
import { locationSchema } from "./common";
import { regenDb } from "../db/connection";

//questID: unique id of the quest
//name: name of the quest
//description: description of the quest
//objective: objective of the quest
//initiative: initiative of the quest
//type: what type of quest is it? project, program, coop
//duration: how long is it?
//location: location of the quest
//startDate: start date of the quest
//endDate: end date of the quest
//requirements: list of requirements for the quest
//members: list of IDs of the members
//history: history of the quest
//budget: budget for the quest
//tasks: list of Ids of the tasks that belong to this quest
//hashtags: list of hashtags corresponding to the quest
const questSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  objective: String,
  initiative: String,
  type: { type: String, enum: ["project", "program", "coop"], required: true }, // Enum to define the types of quests
  duration: String,
  location: locationSchema,
  startDate: { type: Date },
  endDate: { type: Date },
  requirements: [String],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  history: [String],
  budget: Number,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  hashtags: [String],
});

export const Quest = regenDb.model("Quest", questSchema);
