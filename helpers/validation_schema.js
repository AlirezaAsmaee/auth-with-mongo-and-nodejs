const Joi = require('@hapi/joi');

exports.authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})

