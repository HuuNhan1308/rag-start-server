import { Router } from "express";
import { chatController } from "../../controllers";
import { chatSchema } from "../../validation/chat";
import { requireUser, validateRequest } from "../../middleware";

const chatRouter = Router();

chatRouter.post("", requireUser, validateRequest(chatSchema), chatController.chat);

export default chatRouter;