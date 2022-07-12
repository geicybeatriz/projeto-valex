import { Router } from "express";
import { addPurchase, addVirtualPurchase } from "../controllers/purchaseControllers.js";
import validateSchemas from "../middlewares/schemasValidate.js";
import { purchaseSchema, virtualPurchaseSchema } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", validateSchemas(purchaseSchema), addPurchase);
purchaseRouter.post("/virtual-purchase", validateSchemas(virtualPurchaseSchema),addVirtualPurchase);

export default purchaseRouter;