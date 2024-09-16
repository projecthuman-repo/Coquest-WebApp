import { InferSchemaType, Schema } from "mongoose";
import { regenDb } from "../db/connection";

// name: name of the motive
const motiveSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export type MotiveSchemaType = InferSchemaType<typeof motiveSchema>;
export const Motive = regenDb.model("Motive", motiveSchema);
