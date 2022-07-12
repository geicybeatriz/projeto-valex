import { insertPayment } from "../repositories/paymentRepository.js";
import { compareBalance, compareTypeCardAndBusiness, verifyBusinessById, verifyCardById, verifyExpirationDate, verifyIsBlocked, verifyPassword } 
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