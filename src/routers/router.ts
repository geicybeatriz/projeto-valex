import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargesRouter.js";

const router = Router();
router.use(cardRouter);
router.use(rechargeRouter);

export default router;