import express from "express";
import * as chatsController from "../controllers/chats";

const router = express.Router();

router.get("/", chatsController.getMessages);

export default router;
