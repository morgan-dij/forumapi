import mongoose from "mongoose";
import { PostDocument } from "./Post";
import { UserDocument, User } from "./User";

export type TopicDocument = mongoose.Document & {
  _id: string,
  userId: UserDocument,
  title: string,
  creation: Date
};

User.schema;

const topicSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  userId: {type: String, ref: "user"},
  title: String,
  creation: Date
}, { timestamps: true });

export const Topic = mongoose.model<TopicDocument>("topic", topicSchema, "topics");
