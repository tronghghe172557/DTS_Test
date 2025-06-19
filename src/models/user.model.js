import mongoose from "mongoose";
import { statusEnum } from "../constant/status.constant.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // set index for faster queries
    },
    phone: { type: String, required: true },
    avatar: { type: String, default: "default_avatar.png" },
    status: {
      type: String,
      enum: [statusEnum.ACTIVE, statusEnum.INACTIVE],
      default: statusEnum.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
