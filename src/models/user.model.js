import mongoose from "mongoose";
import { statusEnum } from "../constant/status.constant.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, trim: true, default: null },
    username: { type: String, required: false, trim: true, default: null },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true, // set index for faster queries
    },
    phone: { type: String, required: false, default: null },
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

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
