import { findById, getCardByEmployeeAndId, update } from "../repositories/cardRepository.js";
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

export async function getEmployeeCard(employeeId:number, cardId:number, password:any){
    const cryptr = new Cryptr('myTotallySecretKey');
    const card = await findById(cardId);
    console.log(card);

    if(!card) throw {type:"notFound", message:"card is not found"};
    if(card.employeeId !== employeeId ) throw {type:"unauthorized",message:"access denied"};

    const decryptPass = await bcrypt.compare(password, card.password);
    if((card.employeeId === employeeId) && (!decryptPass || card.isBlocked)) throw {type:"unauthorized", message:"incorrect password"};

    const decryptedString = cryptr.decrypt(card.securityCode);
    const employeeCard = {
        number: card.number,
        cardholderName: card.cardholderName,
        expirationDate: card.expirationDate,
        securityCode: decryptedString
    };

    return employeeCard;
}
