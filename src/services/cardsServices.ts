import { verifyCardById, verifyExpirationDate, verifySecurityCode, setHashPassword, isNullPassword, verifyEmployeeCard, verifyPassword, verifyIsBlocked } from "../utils/cardUtils.js";

import { findById, update } from "../repositories/cardRepository.js";
import { findByCardId } from "../repositories/paymentRepository.js";
import {findRechargeByCardId} from "../repositories/rechargeRepository.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr('myTotallySecretKey');

export async function activeCard(cardId:string, securityCode:string, password:string){
    const verifyCard = await verifyCardById(parseInt(cardId));
    await isNullPassword(verifyCard.password);
    await verifyExpirationDate(verifyCard.expirationDate);
    await verifySecurityCode(verifyCard.securityCode, securityCode);
    const hashPassword = await setHashPassword(password);
    await updateCardData(cardId, hashPassword);
    return ("ok");
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
    const card = await verifyCardById(cardId);
    const isEmployee = await verifyEmployeeCard(card.employeeId, employeeId);
    if(isEmployee){
        await verifyPassword(card, password);
        await verifyIsBlocked(card.isBlocked);
    }

    const decryptedString = cryptr.decrypt(card.securityCode);
    const employeeCard = {
        number: card.number,
        cardholderName: card.cardholderName,
        expirationDate: card.expirationDate,
        securityCode: decryptedString
    };

    return employeeCard;
}

export async function getCardTransactions(cardId: number){
    await verifyCardById(cardId);

    const transactions = await findByCardId(cardId);
    const totalTransactions = await getTotal(transactions);
    const recharges = await findRechargeByCardId(cardId);
    const totalRecharges = await getTotal(recharges);
    
    return {
        balance: totalRecharges-totalTransactions, 
        transactions:transactions, 
        recharges:recharges 
    };
}

async function getTotal(transactions:any[]){
    if(transactions.length === 0) return 0;

    const arr = [];
    transactions.forEach((pay) => arr.push(pay.amount));
    const sum = arr.reduce((total, a) => total += a);
    return sum;
}


