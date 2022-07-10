import { Request, Response } from "express";
import { activeCard } from "../services/cardsServices.js";
import { createNewCard } from "../services/createCardServices.js";

//testar todo caminho das funções, 
//encontrar o erro na criação dos cartões,
//definir validação para a senha conforme o requisito no notion; 

export async function createCard(req:Request, res:Response){
    const {apiKey} = res.locals;
    const {employeeId, type} = req.body;
    const newCard = await createNewCard(apiKey, employeeId, type);
        
    return res.status(201).send(newCard);
    
}

export async function activateCard(req:Request, res:Response){
    const {cardId, securityCode, password} = req.body;
    await activeCard(cardId, securityCode, password);

    res.sendStatus(200);

}