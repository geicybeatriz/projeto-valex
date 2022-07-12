import { Request, Response } from "express";
import { dataValidation, insertVirtualPurchase } from "../services/purchaseServices.js";

export async function addPurchase(req:Request, res:Response){
    const cardId = parseInt(req.body.cardId);
    const password = req.body.password;
    const businessId = parseInt(req.body.businessId);
    const amount = parseInt(req.body.amount);

    const newPayment = await dataValidation(cardId, password, businessId, amount);  
    
    res.status(200).send(newPayment);
}

export async function addVirtualPurchase(req:Request, res:Response){
    const cardData = req.body.cardData;
    const businessId = parseInt(req.body.businessId);
    const amount = parseInt(req.body.amount);

    const newPayment = await insertVirtualPurchase(cardData, businessId, amount);

    res.status(200).send(newPayment);
}