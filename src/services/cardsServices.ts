import { findById, update } from "../repositories/cardRepository.js";
import Cryptr from "cryptr";
import * as bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

export async function activeCard(cardId:string, securityCode:string, password:string){
    const verifyCard = await verifyCardById(cardId);
    const security = await verifySecurityCode(verifyCard.securityCode, securityCode);
    const hashPassword = await setHashPassword(password);
    await updateCardData(cardId, hashPassword);
    return ("ok");
}

async function verifyCardById(cardId:string){
    const card = await findById(parseInt(cardId));

    if(!card) throw {type:"notFound", message:"card not found"}
    if(card.password !== null) throw {type:"conflict", message:"this card is already active"};

    if(dayjs(card.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) throw { 
        type:"unprocessable", 
        message:"invalid card"
    };

    return card;
}

async function verifySecurityCode(cardSecurityCode:string, securityCode:string){
    const cryptr = new Cryptr('myTotallySecretKey');
    const decryptedString = cryptr.decrypt(cardSecurityCode);

    if(decryptedString !== securityCode) throw {
        type:"unauthorized",
        message: "security code error"
    }

    return decryptedString;
}

function setHashPassword(password:string){
    return bcrypt.hash(password,10);
}

async function updateCardData(cardId:string,password:string){
    const newCardData = {
        password:password, 
        isBlocked: false
    }
    await update(parseInt(cardId), newCardData);
    return ("cartão ativado");
}
