import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//id of the logged in user
const regenquestLoggedInUsersSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "regenquestUser", // Reference to the User model
    required: true,
    unique: true,
  },
});

export default regenDb.model(
  "regenquestLoggedInUsers",
  regenquestLoggedInUsersSchema,
);
