import Joi from "joi";

export const purchaseSchema = Joi.object({
    cardId: Joi.string().required(),
    password: Joi.string().trim().pattern(new RegExp('^[0-9]{4}$')).required(),
    businessId: Joi.string().required(), 
    amount: Joi.number().integer().positive().required()
});

export const virtualPurchaseSchema = Joi.object({
    cardData: Joi.object({
        number: Joi.string().required(),
        name: Joi.string().required(),
        expDate: Joi.string().required(),
        cvv:Joi.string().trim().pattern(new RegExp('^[0-9]{3}$')).required(),
    }).required(),
    businessId: Joi.string().required(), 
    amount: Joi.number().integer().positive().required()
});