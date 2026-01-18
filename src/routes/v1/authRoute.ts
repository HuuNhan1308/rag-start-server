import { Router } from "express";
import { authController } from "../../controllers";
import { requireUser, validateRequest } from "../../middleware";
import { loginSchema, changePasswordSchema, registerSchema } from "../../validation/account";
const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);
authRouter.post("/register", validateRequest(registerSchema), authController.register);
authRouter.put("/changePassword", requireUser, validateRequest(changePasswordSchema), authController.changePassword);
authRouter.post("/loginAdmin", validateRequest(loginSchema), authController.loginAdmin);

export default authRouter;
