import { Server } from "socket.io";

let io;

export const initIo = (httpServer) => {
  io = new Server(httpServer, {
    cors: "*",
  });
  return io;
};

export const getIo = () => {
  try {
    if (!io) {
      throw new Error("Fail to setup io");
    }
    return io;
  } catch (error) {
    throw new Error(error);
  }
};
