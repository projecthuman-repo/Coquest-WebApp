import { Schema, InferSchemaType } from "mongoose";
import { regenDb } from "../db/connection";

//chatID: unique id of the chat
//members: user ids of all the members
//name: name of the chat
//description: description of the chat
//createdAt: time the chat was created
const chatSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type ChatSchemaType = InferSchemaType<typeof chatSchema>;
export const Chat = regenDb.model("Chat", chatSchema);
