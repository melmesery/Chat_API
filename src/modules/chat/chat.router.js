import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endpoint from "./chat.endpoint.js";
import * as chatController from "./controller/chat.js";
const router = Router();

router.post("/", auth(endpoint.createChat), chatController.createChat);

router.get("/ovo/:destId", auth(endpoint.getChat), chatController.getChat);

export default router;
