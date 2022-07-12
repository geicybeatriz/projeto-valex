import { Request, Response } from "express";

export async function addPurchase(req:Request, res:Response){
    console.log(req.body);
    res.sendStatus(200);
}