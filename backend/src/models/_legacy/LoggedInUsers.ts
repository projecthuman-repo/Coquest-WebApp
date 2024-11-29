import { InferSchemaType, Schema } from "mongoose";
import { regenDb } from "../../db/connection";

//id of the logged in user
const loggedInUsersSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    unique: true,
  },
});

export type LoggedInUsersSchemaType = InferSchemaType<
  typeof loggedInUsersSchema
>;
export const LoggedInUsers = regenDb.model(
  "LoggedInUsers",
  loggedInUsersSchema,
);
