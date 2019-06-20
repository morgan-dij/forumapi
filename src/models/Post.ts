import mongoose from "mongoose";
import { UserDocument, User } from "./User";

export type PostDocument = mongoose.Document & {
  _id: string,
  userId: UserDocument,
  topicId: string,
  date: Date,
  content: String
};

User.schema;

const postSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  userId: {type: String, ref: "user"},
  topicId: String,
  date: Date,
  content: String
}, { timestamps: true });

export const Post = mongoose.model<PostDocument>("post", postSchema, "posts");
