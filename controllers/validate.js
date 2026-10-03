const Joi = require('@hapi/joi');

const registerValidate = (dados) => {

    const esquema = Joi.object({
        nome: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(10).max(150),
        senha: Joi.string().required().min(6).max(150),
    })

    return esquema.validate(dados)
};

const loginValidate = (dados) => {

    const esquema = Joi.object({
        email: Joi.string().required().min(10).max(150),
        senha: Joi.string().required().min(6).max(150),
    })

    return esquema.validate(dados)
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;