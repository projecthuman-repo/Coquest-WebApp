import { User } from "./User";

// const mongoose = require("mongoose");

import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  programType: { type: String, required: true }, // Enum can be used to specify types
  programDescription: { type: String, required: true },
  programObjective: { type: String, required: true },
  hashtags: [String], // For searching by hashtags
  isCharity: { type: Boolean, default: false }, // Is it a charity program?
  initiativePurpose: String, // Purpose for initiative or charity programs
  participationType: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  }, // Public or Private participation
  hasProgramPlanningExperience: { type: Boolean, default: false }, // Experience in program planning

  // Operations: Time and Location
  startDate: { type: Date },
  endDate: { type: Date },
  startTime: { type: String }, // Could use Date type for time, but String allows more flexibility
  endTime: { type: String },
  recurring: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Custom"],
    default: "Custom",
  },
  location: { type: String }, // Location of the program
  ownsProgramSpace: { type: Boolean, default: false },
  rentalSpaceBooked: { type: Boolean, default: false }, // Space rental information
  rentalSpaceDetails: { type: String }, // Details about rental space

  // Volunteer Opportunities
  volunteerOpportunities: {
    type: String,
  },

  // Budgeting
  budgetingItems: [
    {
      itemName: String,
      quantity: { type: Number, default: 0 },
      costEach: { type: Number, default: 0 },
      costTotal: { type: Number, default: 0 },
    },
  ],

  openToBartering: { type: Boolean, default: false },

  // Participation & Crowdfunding
  participationCost: { type: Number, default: 0 }, // Cost to participate
  maxParticipants: { type: Number, default: null }, // Max number of participants
  needsCrowdfunding: { type: Boolean, default: false }, // Is crowdfunding needed?
  crowdfundingAmount: { type: Number, default: 0 }, // Crowdfunding goal
  crowdfundingMessage: { type: String }, // Message to backers

  // Promotion
  promotionImage: String, // Path to uploaded header image
  shareLink: String, // Link to share program
  invitedUsers: [String], // List of invited user handles (e.g., @User1, @User2)
});

export const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;
