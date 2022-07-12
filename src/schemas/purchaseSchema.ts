import Joi from "joi";

export const purchaseSchema = Joi.object({
    cardId: Joi.string().required(),
    password: Joi.string().trim().pattern(new RegExp('^[0-9]{4}$')).required(),
    businessId: Joi.string().required(), 
    amount: Joi.number().integer().positive().required()
});