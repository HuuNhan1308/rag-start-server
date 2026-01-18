import { Router } from "express";
import { healthController } from "../../controllers";

const healthRouter = Router();

healthRouter.get("", healthController.healthCheck);

export default healthRouter;
