import Joi from "joi";

export const createCardSchema = Joi.object({
    employeeId: Joi.string().required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
});

export const activateCardSchema = Joi.object({
    cardId: Joi.string().required(),
    securityCode: Joi.string().trim().pattern(new RegExp('^[0-9]{3}$')).required(), 
    password: Joi.string().trim().pattern(new RegExp('^[0-9]{4}$')).required()
});

export const passwordSchema = Joi.object({
    password: Joi.string().trim().pattern(new RegExp('^[0-9]{4}$')).required()
});