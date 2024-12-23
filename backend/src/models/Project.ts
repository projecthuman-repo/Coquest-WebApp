import { InferSchemaType, Schema } from "mongoose";
import {
  budgetItem,
  locationSchema,
  milestoneSchema,
  volunteerPositionSchema,
} from "./common";
import { regenDb } from "../db/connection";

const projectSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String },
  summary: { type: String },
  mission: { type: String },
  locationAllowed: { type: Boolean },
  notificationAllowed: { type: Boolean },
  location: { type: locationSchema },
  startDate: { type: String },
  startTime: { type: String },
  endDate: { type: String },
  endTime: { type: String },
  recurring: { type: String, enum: ["DAILY", "WEEKLY", "MONTHLY", "CUSTOM"] },
  radius: { type: String },
  haveNeutralMeetingSpace: { type: Boolean },
  venues: [{ type: String }],
  additionalInfo: { type: String },
  budgetingItems: [budgetItem],
  openToBartering: { type: Boolean },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  milestones: {
    type: [milestoneSchema],
    default: [],
  },
  volunteerPositions: {
    type: [volunteerPositionSchema],
    default: [],
  },
  // Participation & Crowdfunding
  participationCost: { type: Number, default: 0 }, // Cost to participate
  maxParticipants: { type: Number, default: null }, // Max number of participants
  needsCrowdfunding: { type: Boolean, default: false }, // Is crowdfunding needed?
  crowdfundingAmount: { type: Number, default: 0 }, // Crowdfunding goal
  crowdfundingMessage: { type: String }, // Message to backers

  materialHelp: { type: String },
  serviceHelp: { type: String },
  operationHelp: { type: String },

  // Promotion
  promotionArea: locationSchema,
  promotionImage: String, // Path to uploaded header image
  shareLink: String, // Link to share program
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export type ProjectSchemaType = InferSchemaType<typeof projectSchema>;
export const Project = regenDb.model("Project", projectSchema);
