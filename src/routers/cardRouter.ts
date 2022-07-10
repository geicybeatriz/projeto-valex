import { Router } from "express";
import { createCard } from "../constrollers/cardsControllers.js";
import apiKeyValidate from "../middlewares/apiKeyValidation.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import createCardSchema from "../schemas/cardCreateSchema.js";

const cardRouter = Router();

cardRouter.post("/card/create", apiKeyValidate, validateSchemas(createCardSchema),createCard);

export default cardRouter;