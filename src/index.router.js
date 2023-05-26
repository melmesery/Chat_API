// import cors from "cors";
import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import chatRouter from "./modules/chat/chat.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrHandling } from "./utils/ErrorHandling.js";

const initApp = (app, express) => {
  app.use(express.json({}));
  // app.use(cors({}));

   var whitelist = ["http://localhost:5173", ""];
  app.use(async (req, res, next) => {
    if (!whitelist.includes(req.header("origin"))) {
      return next(new Error("Not Allowed By CORS", { cause: 403 }));
    }
    await res.header("Access-Control-Allow-Origin", whitelist);
    await res.header("Access-Control-Allow-Headers", "*");
    await res.header("Access-Control-Allow-Private-Network", "true");
    await res.header("Access-Control-Allow-Methods", "*");
    next();
  });

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
