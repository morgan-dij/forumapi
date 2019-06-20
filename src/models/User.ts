import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  _id: string,
  email: string,
  passwd: string,
  creation: Date,

  profile: {
    pseudo: string,
    avatar: string
  }
};

const userSchema = new mongoose.Schema({
  _id: String,
  email: { type: String, unique: true },
  passwd: String,
  creation: Date,

  profile: {
    pseudo: String,
    avatar: String
  }
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("user", userSchema, "users");
