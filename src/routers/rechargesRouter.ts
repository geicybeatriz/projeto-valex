import { Router } from "express";
import { rechargeCardById } from "../controllers/rechargeControllers.js";
import apiKeyValidate from "../middlewares/apiKeyValidation.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:cardId", apiKeyValidate, validateSchemas(rechargeSchema), rechargeCardById);

export default rechargeRouter;