import { Router } from "express";
import { validatingToken } from "../middlewares/validate-auth.js";
import aiController from "../controllers/ai-controller.js";

export const AIRouter = Router();

AIRouter.post("/ai", validatingToken, aiController.defaultPrompt);
AIRouter.post("/ai/long-context", aiController.longContext);

export default AIRouter;
