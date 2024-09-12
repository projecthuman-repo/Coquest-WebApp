import { Schema } from "mongoose";
import { imageSchema, locationSchema } from "./common";
import { regenDb } from "../db/connection";
import validators from "./validators";
import { User } from "./User";

//name: name of the community
//description: of the community
//objective: of the community
//initiative: of the community
//members: list of userID of people in the community
//theme: theme of the community
//image: image for the community
const communitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  objective: { type: String, required: true },
  initiative: { type: String, required: true },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: validators.idValidators(() => User, "member"),
      },
    ],
    validate: validators.arrValidators("members"),
    metadata: { expandable: true },
  },
  tags: [String],
  location: { type: locationSchema, required: true },
  images: [imageSchema],
});

export const Community = regenDb.model("Community", communitySchema);
