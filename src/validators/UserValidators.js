const { checkSchema } = require('express-validator')


module.exports = {
    editAction_val: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome não pode ter menos de 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Senha não pode ter menos de 2 caracteres'
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
}