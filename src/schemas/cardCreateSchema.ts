import Joi from "joi";

const createCardSchema = Joi.object({
    employeeId: Joi.string().required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
});

export default createCardSchema;