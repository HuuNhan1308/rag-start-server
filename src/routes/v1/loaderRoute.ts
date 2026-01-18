import { Router } from "express";
import { loaderController } from "../../controllers";
import { loadWebSchema, loadUrlPDFSchema } from "../../validation/knowledge";
import { requireUser, validateRequest } from "../../middleware";

const loaderRouter = Router();

loaderRouter.post("/loadWeb", requireUser, validateRequest(loadWebSchema), loaderController.loadWeb);
loaderRouter.post("/loadUrlPDF", requireUser, validateRequest(loadUrlPDFSchema), loaderController.loadUrlPDF);

export default loaderRouter;
