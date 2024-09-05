const { Schema } = require("mongoose");

const imageSchema = new Schema({
  contentType: { type: String, required: true },
  path: { type: String, required: true },
});

const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const skillSchema = new Schema({
  skillName: String,
  skillLevel: String,
});

const badgeSchema = new Schema({
  badgeName: String,
  badgeDescription: String,
});

const recommendationSchema = new Schema({
  name: String,
  comment: String,
});

module.exports = {
  imageSchema,
  locationSchema,
  skillSchema,
  badgeSchema,
  recommendationSchema,
};
