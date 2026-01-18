import Joi from "joi";


export const chatSchema = Joi.object({
    message: Joi.string().required(),
});

export const loadWebSchema = Joi.object({
    url: Joi.string().required(),
    selector: Joi.string().optional(),
});

export const loadPDFSchema = Joi.object({
    url: Joi.string().required(),
});