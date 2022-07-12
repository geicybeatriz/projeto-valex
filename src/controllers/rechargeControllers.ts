import { Request, Response } from "express";
import { insert } from "../repositories/rechargeRepository.js";
import { findCompanyByApiKey, verifyCardById, verifyExpirationDate, verifyIsBlocked } from "../utils/cardUtils.js";

export async function rechargeCardById(req:Request, res:Response){
    const cardId = parseInt(req.params.cardId);
    const amount = parseInt(req.body.amount);
    const apiKey = res.locals.apiKey;

    await findCompanyByApiKey(apiKey);
    const card = await verifyCardById(cardId);
    await verifyExpirationDate(card.expirationDate);
    await verifyIsBlocked(card.isBlocked);
    await insert({cardId:cardId, amount:amount});

    res.sendStatus(200);
}