import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//messageID: unique id of the message
//chatID: id of the chat the message belongs to
//sentFrom: id of the user that sent this message
//message: content of the message
//time: time this message was sent
//unreadBy: list of users from chat that have not read the message
const regenquestMessageSchema = new Schema({
  chatID: {
    type: Schema.Types.ObjectId,
    ref: "regenquestChat",
    required: true,
  },
  sentFrom: {
    type: Schema.Types.ObjectId,
    ref: "regenquestUser",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  unreadBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "regenquestUser",
    },
  ],
});

export default regenDb.model("regenquestMessage", regenquestMessageSchema);
