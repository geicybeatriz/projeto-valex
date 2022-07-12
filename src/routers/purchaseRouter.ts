import { Router } from "express";
import { addPurchase } from "../controllers/purchaseControllers.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", validateSchemas(purchaseSchema), addPurchase);

export default purchaseRouter;