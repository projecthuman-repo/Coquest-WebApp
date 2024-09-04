const { Schema, default: mongoose } = require("mongoose");
const { regenDb } = require("../db/connection");

//postID: unique id of the post
//userID: ID of the user that made the post
//title: the title of the post
//description: the description of the post
//likes: number of likes the post has
//attachments: links to all the files attached to the post such as images
//createdAt: when was the post created
//comments: list of all the comments on the post
//tags: list of tags associated with the post, useful for filtering
const regenquestPostSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "regenquestUser",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  likes: { type: Number, default: 0 },
  attachments: [String],
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      userID: {
        type: Schema.Types.ObjectId,
        ref: "regenquestUser",
        required: true,
      },
      body: { type: String, required: true },
    },
  ],
  tags: [{ type: String, default: [] }],
});

module.exports = regenDb.model("regenquestPost", regenquestPostSchema);
