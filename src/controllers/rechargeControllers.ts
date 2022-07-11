import { Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import { insert } from "../repositories/rechargeRepository.js";
import { verifyCardById } from "../utils/cardUtils.js";

export async function rechargeCardById(req:Request, res:Response){
    const cardId = parseInt(req.params.cardId);
    const amount = parseInt(req.body.amount);
    const apiKey = res.locals.apiKey;

    const companyExist = await findByApiKey(apiKey);
    if(!companyExist) throw {type:"notFound", message:"not found"};
    await verifyCardById(cardId);
    await insert({cardId:cardId, amount:amount});

    res.sendStatus(200);
}