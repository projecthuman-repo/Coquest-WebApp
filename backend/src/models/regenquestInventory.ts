import { Schema } from "mongoose";
import { imageSchema } from "./common";
import { regenDb } from "../db/connection";

//itemIDL unique id of the item
//userID: id of the current user that owns this item
//taskLink: id of the task this item belongs to
//itemName: name of the item
//createdAt: date and time of createion of the item
//description: description of the item
//image: link to the image of the item
//history: list of userID that owned this item previously
const regenquestInventorySchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "regenquestUser",
    required: true,
  },
  taskLink: {
    type: Schema.Types.ObjectId,
    ref: "regenquestTask",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: String,
  image: imageSchema,
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "regenquestUser",
    },
  ],
});

export default regenDb.model("regenquestInventory", regenquestInventorySchema);
