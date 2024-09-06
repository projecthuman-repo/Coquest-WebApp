import { Schema } from "mongoose";
import {
  imageSchema,
  locationSchema,
  recommendationSchema,
  badgeSchema,
  skillSchema,
} from "./common";
import { regenDb } from "../db/connection";
import validators from "./validators";
import CrossPlatformUser from "./crossPlatform/User";
import regenquestCommunity from "./regenquestCommunity";

//userID: a unique ID generated during registeration, used to connect user data to the user
//name: name of the user
//username: username of the user
//email: email of the user
//passwordHash: password hash of the user
//registered: indicator of registration progress. See User model type definition in userobserver.ts
//location: location of the user
//image: image of the user
//motive: the motive of the user for joining regenquest, user will pick from a list (volunteer, creating project, ...)
//biography: a biograph of the user
//topics: a list of topics (Strings) that the user is interested in.
//communities: the list of communities that the user has joined.
//skills: A list of skills that the user has, along with the skill level, (Basic, intermediate, Advanced)
//Badges: A list of all the badges the user has earned
//currentLevel: placeholder for user level, will be later calculated
//recommendations: recomendationg given by other people
const regenquestUserSchema = new Schema({
  // userID is not marked as required because it needs to reference its corresponding CrossPlatform.users junction document,
  // which doesn't exist on regenquestuser creation
  userID: {
    type: Schema.Types.ObjectId,
    unique: true,
    validate: validators.idValidators(
      () => CrossPlatformUser,
      "crossplatform user",
    ),
  },
  name: {
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true },
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  registered: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value) {
        return typeof value === "boolean" || Number.isInteger(value);
      },
      message: (props) =>
        `${props.value} is not a valid registered value (must be a boolean or an integer)`,
    },
  },
  location: locationSchema,
  images: [imageSchema],
  motives: [String],
  biography: String,
  topics: [String],
  communities: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "regenquestCommunity",
        validate: validators.idValidators(
          () => regenquestCommunity,
          "community",
        ),
      },
    ],
    validate: validators.arrValidators("communities"),
    metadata: { expandable: true },
  },
  skills: [skillSchema],
  badges: [badgeSchema],
  currentLevel: Number,
  recommendations: [recommendationSchema],
});

export default regenDb.model("regenquestUser", regenquestUserSchema);
