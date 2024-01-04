const { checkSchema } = require('express-validator')
const { signup, signin } = require('../controllers/AuthController')

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Nome não pode ter menos de 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Senha não pode ter menos de 2 caracteres'
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Senha não pode ter menos de 2 caracteres'
        }
    })
}