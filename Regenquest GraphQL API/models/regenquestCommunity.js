const { model, Schema, default: mongoose } = require("mongoose");
const { imageSchema, locationSchema } = require("./common");
const validators = require("./validators");

//name: name of the community
//description: of the community
//members: list of userID of people in the community
//theme: theme of the community
//image: image for the community
const regenquestCommunitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "regenquestUser",
        validate: validators.idValidators(
          () => require("./regenquestUser"),
          "member",
        ),
      },
    ],
    validate: validators.arrValidators("members"),
    metadata: { expandable: true },
  },
  tags: [String],
  location: { type: locationSchema, required: true },
  images: [imageSchema],
});

module.exports = model("regenquestCommunity", regenquestCommunitySchema);
