import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//chatID: unique id of the chat
//members: user ids of all the members
//name: name of the chat
//description: description of the chat
//createdAt: time the chat was created
const regenquestChatSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "regenquestUser",
    },
  ],
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default regenDb.model("regenquestChat", regenquestChatSchema);
