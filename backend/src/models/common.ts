import { Schema } from "mongoose";

export const imageSchema = new Schema({
  contentType: { type: String, required: true },
  path: { type: String, required: true },
});

export const locationSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
});

export const skillSchema = new Schema({
  skillName: String,
  skillLevel: String,
});

export const badgeSchema = new Schema({
  badgeName: String,
  badgeDescription: String,
});

export const recommendationSchema = new Schema({
  name: String,
  comment: String,
});

export const budgetItem = new Schema({
  itemName: String,
  quantity: { type: Number, default: 0 },
  costEach: { type: Number, default: 0 },
  costTotal: { type: Number, default: 0 },
});

export const volunteerPositionSchema = new Schema({
  title: { type: String, required: true },
  responsibilities: { type: String },
  skills: [{ type: String }],
});

export const milestoneSchema = new Schema({
  title: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dateStarted: { type: String },
  dateCompleted: { type: String },
});
