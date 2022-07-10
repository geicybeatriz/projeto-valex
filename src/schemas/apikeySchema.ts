import Joi from "joi";

const apiKeySchema = Joi.string().required();

export default apiKeySchema;