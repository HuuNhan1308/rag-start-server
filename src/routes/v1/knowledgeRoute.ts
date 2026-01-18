import { Router } from "express";
import { knowledgeController } from "../../controllers";
import { validateRequest, upload, requireUser } from "../../middleware";
import { loadPDFSchema } from "../../validation/chat";
import { loadWebSchema } from "../../validation/chat";

const knowledgeRouter = Router();

knowledgeRouter.post("/web", requireUser, validateRequest(loadWebSchema), knowledgeController.storeWebDocument);
knowledgeRouter.post("/pdf", requireUser, validateRequest(loadPDFSchema), knowledgeController.storePDFDocument);
knowledgeRouter.post("/upload", requireUser, upload.single("file"), knowledgeController.storeUploadedPDFDocument);

export default knowledgeRouter;
