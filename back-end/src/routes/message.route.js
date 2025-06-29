import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar,getMessage,sendMessage} from "../controllers/message.controllers.js"
const route = express.Router();

route.get("/users", protectRoute, getUsersForSidebar);
route.get("/:id", protectRoute, getMessage);
route.post("/send/:id",protectRoute,sendMessage)

export default route;
