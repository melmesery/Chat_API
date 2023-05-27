import dotenv from "dotenv";
import express from "express";
import path from "path"; 
import { fileURLToPath } from "url";
import userModel from "./DB/model/User.model.js";
import initApp from "./src/index.router.js";
import { roles, socketAuth } from "./src/middleware/auth.js";
import { initIo } from "./src/utils/Socket.js"; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "config/.env") });

const app = express();
const port = process.env.PORT || 5000;

initApp(app, express);
const httpServer = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = initIo(httpServer);

io.on("connection", (socket) => {
  socket.on("updatedSocketId", async (data) => {
    const user = await socketAuth(data.token, Object.values(roles), socket.id);
    await userModel.updateOne({ _id: user?._id }, { socketId: socket.id });
    socket.emit("auth", "Done");
  });
});
 
