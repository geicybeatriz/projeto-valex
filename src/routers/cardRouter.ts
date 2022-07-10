import { Router } from "express";
import { activateCard, createCard } from "../constrollers/cardsControllers.js";
import apiKeyValidate from "../middlewares/apiKeyValidation.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import createCardSchema from "../schemas/cardCreateSchema.js";

const cardRouter = Router();

cardRouter.post("/card/create", apiKeyValidate, validateSchemas(createCardSchema),createCard);
cardRouter.post("/card/activate", activateCard);

export default cardRouter;