import { Request, Response } from "express";
import { activeCard, getCardTransactions, getEmployeeCard, lockUnlockCard } from "../services/cardsServices.js";
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

export async function getCardByEmployeeId(req:Request, res:Response){
    const employeeId = parseInt(req.params.employeeId);
    const cardId = parseInt(req.params.cardId);
    const password = (req.query.password).toString();

    const card = await getEmployeeCard(employeeId, cardId, password);
    res.status(200).send(card);
}

export async function getTransactionsByCard(req:Request, res:Response){
    const cardId = parseInt(req.params.cardId);
    const transactions = await getCardTransactions(cardId);
    
    res.status(200).send(transactions)
}

export async function lockUnlockCardById(req:Request, res:Response){
    const password = (req.body.password).toString();
    const cardId = parseInt(req.params.cardId);
    await lockUnlockCard(cardId, password);
    
    res.sendStatus(200);
}