import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

// name: name of the motive
const regenquestMotiveSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default regenDb.model("regenquestMotive", regenquestMotiveSchema);
