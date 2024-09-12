import { Schema } from "mongoose";
import { locationSchema } from "./common";
import { regenDb } from "../db/connection";

//eventID: unique id of the event
//name: name of the event
//theme: theme of the event
//location: location of the event
//time: time of the event
//description: description of the event
//layer: the layer this event blongs to
//hashtags[]: list of all the hashtags for this event
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  theme: String,
  location: locationSchema,
  time: {
    type: Date,
    required: true,
  },
  description: String,
  layer: String,
  hashtags: [
    {
      type: String,
    },
  ],
});

export const Event = regenDb.model("Event", eventSchema);
