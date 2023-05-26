import mongoose, { Schema, Types, model } from "mongoose";

const chatSchema = new Schema(
  {
    POne: { type: Types.ObjectId, ref: "User", required: true },
    PTwo: { type: Types.ObjectId, ref: "User", required: true },
    messages: [
      {
        from: { type: Types.ObjectId, ref: "User", required: true },
        to: { type: Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
); 

const chatModel = mongoose.models.Chat || model("Chat", chatSchema);
export default chatModel;
