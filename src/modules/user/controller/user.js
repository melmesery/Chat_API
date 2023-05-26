import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/ErrorHandling.js";

export const profile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  return res.status(200).json({ message: "Done", user });
});

export const friends = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({
    _id: { $ne: req.user._id },
    confirmEmail: true,
  });
  return res.status(200).json({ message: "Done", users });
});
