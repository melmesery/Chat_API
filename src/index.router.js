import cors from "cors";
import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import chatRouter from "./modules/chat/chat.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrHandling } from "./utils/ErrorHandling.js";

const initApp = (app, express) => {
  app.use(express.json({}));
  app.use(cors({}));

  app.get("/", (req, res) => res.send("Hello World!"));

  app.use(`/auth`, authRouter);
  app.use(`/user`, userRouter);
  app.use(`/chat`, chatRouter);

  app.all("*", (req, res, next) => {
    res.send("Page Not Found!");
  });

  app.use(globalErrHandling);
  connectDB();
};

export default initApp;
