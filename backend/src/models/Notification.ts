import { InferSchemaType, Schema } from "mongoose";
import { imageSchema } from "./common";
import { regenDb } from "../db/connection";

//userID: id of the user that this notification belongs to
//notificationID: unique id of the notification
//title: title of the notification
//content: content of the notification
//image: image link for this notification
//link: link to the notification
//date: when this notification was created
//isRead: has this notification been read?
//isDeleted: has this notification been deleted?
const notificationSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: imageSchema,
  link: String,
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

export type NotificationSchemaType = InferSchemaType<typeof notificationSchema>;
export const Notification = regenDb.model("Notification", notificationSchema);
