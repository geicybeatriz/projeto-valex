import { findByTypeAndEmployeeId, insert, TransactionTypes } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";


export async function createNewCard(apiKey: string, employeeId:string, type:TransactionTypes){
    const company = await verifyCompany(apiKey);
    const employee = await verifyEmployee(employeeId);
    const card = await verifyCardByTypeAndEmployeeId(employeeId, type);
    
    return {
        company:company, 
        employee:employee,
        card:card
    };

}

async function verifyCompany(apiKey:string){
    const company = await findByApiKey(apiKey);
    if(!company) throw {
        type: "unauthorized",
        message:"unauthorized api key"
    };
    return company;
}

async function verifyEmployee(employeeId: string){
    const checkEmployee = await findById(parseInt(employeeId));
    if(!checkEmployee) throw {
        type: "not_found",
        message: "employee not found"
    }
    return checkEmployee;
}

async function verifyCardByTypeAndEmployeeId(employeeId:string, type:TransactionTypes){
    const checkCardExists = await findByTypeAndEmployeeId(type, parseInt(employeeId));
    if(!checkCardExists) {
        const addNewCard = await modelNewCard(employeeId, type);
        return addNewCard;
    } else if(checkCardExists){
        throw {
            type: "conflict",
            message: "the employee already has this card"
        }
    }
    return checkCardExists;

}

async function modelNewCard(employeeId:string, type:TransactionTypes){
    const numberCard = setNumberCard();
    const numberCVV = setSecurityCode();
    const password : string = null;
    const expirationDate = setExpirationDate();
    const cardholderName = await setHolderName(employeeId);
    const originalCardId : number = null;

    const cardData = {
        employeeId: parseInt(employeeId),
        number: numberCard,
        cardholderName: cardholderName,
        securityCode: numberCVV,
        expirationDate: expirationDate,
        password: password,
        isVirtual: false,
        originalCardId: originalCardId,
        isBlocked:true,
        type: type
    }

    const card = await insert(cardData);
    
    return card;

}

function setNumberCard(){
    return faker.finance.creditCardNumber();
}

function setSecurityCode(){
    const CVV = faker.finance.creditCardCVV();
    const cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.encrypt(CVV);
}

function setExpirationDate(){
    const cardExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");
    return cardExpiration;
}

async function setHolderName(employeeId: string){
    const employee = await findById(parseInt(employeeId));
    const fullname = employee.fullName;
    const nameArr = fullname.split(' ');

    const firstName = nameArr[0];
    const surname = nameArr[nameArr.length - 1];
    const middleNameArr = nameArr.slice(1, (nameArr.length - 1));
    
    const middleNamesFirstLetters = middleNameArr.map((midName)=>{
        if(midName.length > 2){
            return midName.at(0)
        } 
    })
    const middleNameString = middleNamesFirstLetters.join(" ").toString();

    return `${firstName.toUpperCase()} ${middleNameString.toUpperCase()} ${surname.toUpperCase()}`
}