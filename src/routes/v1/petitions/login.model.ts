import joi from 'joi'

export const validationSchema = joi.object().keys({
    password:joi.string().required(),
    user: joi.string().required(),
}).required()