import { NextFunction, Request, Response } from "express";
import apiKeySchema from "../schemas/apikeySchema.js";

export default async function apiKeyValidate(req: Request, res:Response, next:NextFunction){
    const apiKey = req.headers["x-api-key"].toString();
    console.log("apikey passou", apiKey);
    
    const {error} = apiKeySchema.validate(apiKey, {abortEarly: false});
    if(error){
        console.log(error)
        return res.status(422).send(error.details.map((detail:any) => detail.message));
    }

    res.locals.apiKey = apiKey;
    next();
}