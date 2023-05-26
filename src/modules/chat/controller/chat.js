import chatModel from "../../../../DB/model/Chat.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/ErrorHandling.js";
import { getIo } from "../../../utils/Socket.js";

export const createChat = asyncHandler(async (req, res, next) => {
  const { message, destId } = req.body;
  const chat = await chatModel
    .findOne({
      $or: [
        { POne: req.user._id, PTwo: destId },
        { POne: destId, PTwo: req.user._id },
      ],
    })
    .populate([
      {
        path: "POne",
      },
      {
        path: "PTwo",
      },
    ])
    .sort({ createdAt: -1 });

  if (!chat) {
    const destUser = await userModel.findById(destId);
    if (!destUser) {
      return next(new Error("In-valid DestId"), { cause: 404 });
    }
    const newChat = await chatModel.create({
      POne: req.user._id,
      PTwo: destId,
      messages: [{ from: req.user._id, to: destId, message }],
    });
    getIo().to(destUser.socketId).emit("receiveMessage", message);
    return res.status(201).json({ message: "Done", chat: newChat });
  }

  chat.messages.push({ from: req.user._id, to: destId, message });
  await chat.save();

  if (chat.POne._id.toString() == req.user._id) {
    getIo().to(chat.PTwo.socketId).emit("receiveMessage", message);
  } else {
    getIo().to(chat.POne.socketId).emit("receiveMessage", message);
  }
  return res.status(200).json({ message: "Done", chat });
});

export const getChat = asyncHandler(async (req, res, next) => {
  const { destId } = req.params;
  const chat = await chatModel
    .findOne({
      $or: [
        { POne: req.user._id, PTwo: destId },
        { POne: destId, PTwo: req.user._id },
      ],
    })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: "POne",
      },
      {
        path: "PTwo",
      },
    ]);
  return res.status(200).json({ message: "Done", chat });
});
