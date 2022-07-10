import { Request, Response } from "express";
import { createNewCard } from "../services/createCardServices.js";

export async function createCard(req:Request, res:Response){
    const {apiKey} = res.locals;
    const {employeeId, type} = req.body;
    const newCard = await createNewCard(apiKey, employeeId, type);
        
    return res.sendStatus(201);
}