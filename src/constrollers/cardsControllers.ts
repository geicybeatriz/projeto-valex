import { Request, Response } from "express";


export async function createCard(req:Request, res:Response){
    console.log("body", req.body);
    const {apiKey} = res.locals;
    
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}