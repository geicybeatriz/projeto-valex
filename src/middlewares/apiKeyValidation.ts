import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import apiKeySchema from "../schemas/apikeySchema.js";

export default async function apiKeyValidate(req: Request, res:Response, next:NextFunction){
    const apiKey = req.headers["x-api-key"].toString();
    
    const {error} = apiKeySchema.validate(apiKey, {abortEarly: false});
    if(error){
        return res.status(422).send(error.details.map((detail:any) => detail.message));
    }

    res.locals.apiKey = apiKey;
    next();
}