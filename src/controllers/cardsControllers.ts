import { Request, Response } from "express";
import { activeCard } from "../services/cardsServices.js";
import { createNewCard } from "../services/createCardServices.js";

export async function createCard(req:Request, res:Response){
    const {apiKey} = res.locals;
    const {employeeId, type} = req.body;
    const newCard = await createNewCard(apiKey, employeeId, type);
    console.log(newCard);
        
    return res.status(201).send(newCard);
    
}

export async function activateCard(req:Request, res:Response){
    const {cardId, securityCode, password} = req.body;
    await activeCard(cardId, securityCode, password);

    res.sendStatus(200);
}