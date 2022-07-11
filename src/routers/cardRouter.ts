import { Router } from "express";
import { activateCard, createCard, getCardByEmployeeId, getTransactionsByCard, lockUnlockCardById } from "../controllers/cardsControllers.js";
import apiKeyValidate from "../middlewares/apiKeyValidation.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import {activateCardSchema, createCardSchema, passwordSchema} from "../schemas/cardCreateSchema.js";

const cardRouter = Router();

cardRouter.post("/card/create", apiKeyValidate, validateSchemas(createCardSchema),createCard);
cardRouter.post("/card/activate", validateSchemas(activateCardSchema), activateCard);
cardRouter.get("/card/:employeeId/:cardId", getCardByEmployeeId);
cardRouter.get("/transactions/:cardId", getTransactionsByCard);
cardRouter.put("/card/lock-unlock/:cardId",validateSchemas(passwordSchema), lockUnlockCardById);

export default cardRouter;