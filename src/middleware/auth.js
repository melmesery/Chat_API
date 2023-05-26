import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/ErrorHandling.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";
import { getIo } from "../utils/Socket.js";

export const roles = {
  Admin: "Admin",
  User: "User",
  HR: "HR",
};

export const auth = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return next(new Error("In-valid Bearer Key", { cause: 400 }));
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
      return next(new Error("In-valid Token", { cause: 400 }));
    }
    const decoded = verifyToken({ token });
    if (!decoded?.id) {
      return next(new Error("In-valid Token Payload", { cause: 400 }));
    }
    const authUser = await userModel
      .findById(decoded.id)
      .select("userName email image role changePasswordTime");
    if (!authUser) {
      return next(new Error("Not Authenticated Account", { cause: 401 }));
    }
    if (parseInt(authUser.changePasswordTime?.getTime() / 1000) > decoded.iat) {
      return next(new Error("Expired Token", { cause: 400 }));
    }
    if (!accessRoles.includes(authUser.role)) {
      return next(new Error("Not Authorized Account", { cause: 403 }));
    } 
    req.user = authUser;
    return next();
  });
};

export const graphAuth = async (authorization, accessRoles = []) => {
  try {
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      throw new Error("In-valid Bearer Key");
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
      throw new Error("In-valid Token");
    }
    const decoded = verifyToken({ token });
    if (!decoded?.id) {
      throw new Error("In-valid Token Payload");
    }
    const authUser = await userModel
      .findById(decoded.id)
      .select("userName email image role changePasswordTime");
    if (!authUser) {
      throw new Error("Not Authenticated Account");
    }
    if (parseInt(authUser.changePasswordTime?.getTime() / 1000) > decoded.iat) {
      throw new Error("Something went wrong");
    }
    if (!accessRoles.includes(authUser.role)) {
      throw new Error("Not Authorized Account");
    }
    return authUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const socketAuth = async (authorization, accessRoles = [], socketId) => {
  try {
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      getIo().to(socketId).emit("auth", "In-valid Bearer Key");
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
      getIo().to(socketId).emit("auth", "In-valid Token");
    }
    const decoded = verifyToken({ token });
    if (!decoded?.id) {
      getIo().to(socketId).emit("auth", "In-valid Token Payload");
    }
    const authUser = await userModel
      .findById(decoded.id)
      .select("userName email image role changePasswordTime");
    if (!authUser) {
      getIo().to(socketId).emit("auth", "Not Authenticated Account");
    }
    if (parseInt(authUser.changePasswordTime?.getTime() / 1000) > decoded.iat) {
      getIo().to(socketId).emit("auth", "Something went wrong");
    }
    if (authUser.status == "blocked") {
      getIo().to(socketId).emit("auth", "Blocked Account");
    }
    if (!accessRoles.includes(authUser.role)) {
      getIo().to(socketId).emit("auth", "Not Authorized Account");
    }
    return authUser;
  } catch (error) {
    getIo().to(socketId).emit("auth", error);
  }
};
