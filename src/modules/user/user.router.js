import { Router } from "express";
import endpoint from "./user.endPoint.js";
import * as userController from "./controller/user.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.get("/profile", auth(endpoint.profile), userController.profile);

router.get("/", auth(endpoint.profile), userController.friends);

export default router;
