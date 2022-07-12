import { findByCardDetails } from "../repositories/cardRepository.js";
import { insertPayment } from "../repositories/paymentRepository.js";
import { compareBalance, compareTypeCardAndBusiness, verifyBusinessById, verifyCardById, verifyExpirationDate, verifyIsBlocked, verifyPassword, verifySecurityCode } 
from "../utils/cardUtils.js";
import { getCardTransactions } from "./cardsServices.js";


export async function dataValidation(cardId:number, password: string, businessId:number, amount:number){
    const card = await verifyCardById(cardId);
    await verifyPassword(card.password, password);
    await verifyExpirationDate(card.expirationDate);
    await verifyIsBlocked(card.isBlocked);

    const business = await verifyBusinessById(businessId);
    await compareTypeCardAndBusiness(card.type, business.type);

    const transactions = await getCardTransactions(cardId);
    await compareBalance(transactions.balance, amount);

    const newPayment = {
        cardId:cardId,
        businessId:businessId,
        amount:amount
    };

    await insertPayment(newPayment);

    return newPayment;
}

export async function verifyCardByDetails(number:string, name:string, expirationDate:string){
    const card = findByCardDetails(number, name, expirationDate);
    if(!card) throw {type:"notFound", message:"card not found"};
    return card;
}

export async function insertVirtualPurchase(cardData:any, businessId:number, amount:number){
    // const cardNumber : string = cardData.number;
    // const cardName : string = cardData.name;
    // const cardExpDate : string = cardData.expDate;
    // const cardCVV : string = cardData.cvv;

    const card = await verifyCardByDetails(cardData.number, cardData.name, cardData.expDate);
    await verifySecurityCode(card.securityCode, cardData.cvv);
    await verifyExpirationDate(card.expirationDate);
    await verifyIsBlocked(card.isBlocked);

    const business = await verifyBusinessById(businessId);
    await compareTypeCardAndBusiness(card.type, business.type);

    const transactions = await getCardTransactions(card.id);
    await compareBalance(transactions.balance, amount);

    const newPayment = {
        cardId:card.id,
        businessId:businessId,
        amount:amount
    };

    await insertPayment(newPayment);

    return newPayment;
}