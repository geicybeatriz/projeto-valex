import {findById, update} from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import Cryptr from "cryptr";
import * as bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

const cryptr = new Cryptr('myTotallySecretKey');

export async function verifyCardById(cardId:number){
    const card = await findById(cardId);
    if(!card) throw {type:"notFound", message:"card not found"}
    
    return card;
}

export async function isNullPassword(password:string){
    if(password !== null) throw {type:"conflict", message:"this card is already active"};
    return ("ok");
}

export async function verifyExpirationDate(date:string){
    if(dayjs(date).isBefore(dayjs(Date.now()).format("MM-YY"))) throw { 
        type:"unprocessable", 
        message:"invalid card"
    };
    return false;
}

export async function verifySecurityCode(cardSecurityCode:string, securityCode:string){
    const decryptedString = cryptr.decrypt(cardSecurityCode);
    if(decryptedString !== securityCode) throw {
        type:"unauthorized",
        message: "security code error"
    }

    return decryptedString;
}

export function setHashPassword(password:string){
    return bcrypt.hash(password,10);
}

export async function verifyEmployeeCard(id:number, employeeId:number){
    if(id !== employeeId ) throw {type:"unauthorized",message:"access denied"};
    return true;
}

export async function verifyIsBlocked(isBlocked: boolean){
    if(isBlocked) throw {
        type:"unauthorized", 
        message:"card is blocked"
    }
    return false;
}

export async function verifyPassword(currentPassword:string, password:string){
    const decryptPass = await bcrypt.compare(password, currentPassword);
    if(!decryptPass) throw {
        type: "unauthorized",
        message: "incorrect password"
    }
    return decryptPass;
}

export async function saveNewStatus(id: number, currentStatus:boolean){
    const newStatus = !currentStatus;
    await update(id,{isBlocked:newStatus});
    return newStatus;
}

export async function findCompanyByApiKey(apiKey:any){
    const companyExist = await findByApiKey(apiKey);
    if(!companyExist) throw {type:"notFound", message:"not found"};
}
