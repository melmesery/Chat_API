import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      lowercase: true,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, "email must be unique value"],
      required: [true, "userName is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "HR"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    forgetCode: {
      type: Number,
      default: null,
    },
    changePasswordTime: {
      type: Date,
    },
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online", "blocked"],
    },
    provider: {
      type: String,
      default: "system",
      enum: ["system", "facebook", "google"],
    },
    image: Object,
    DOB: String,
    facebookId: String,
    googleId: String,
    socketId: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
