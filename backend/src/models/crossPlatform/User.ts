import mongoose from "mongoose";
import { crossDb } from "../../db/connection";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  lotuslearningUserId: {
    type: String,
  },
  regenquestUserId: {
    type: String,
  },
  spotstitchUserId: {
    type: String,
  },
});

const CrossPlatformUser = crossDb.model("User", userSchema);

export default CrossPlatformUser;
