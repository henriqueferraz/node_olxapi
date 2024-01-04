const mongoose = require('mongoose')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const State = require('../models/State')

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return
        }

        const data = matchedData(req)

        //VALIDANDO O E-MAIL
        const user = await User.findOne({ email: data.email })
        if (!user) {
            res.json({ error: 'E-mail ou senha não conferem' })
            return
        }

        //VALIDANDO A SENHA
        const match = await bcrypt.compare(data.password, user.passwordHash)
        if (!match) {
            res.json({ error: 'E-mail ou senha não conferem' })
            return
        }

        //CRIANDO TOKEN
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        //SALVANDO NOVO TOKEN
        user.token = token
        await user.save()

        res.json({ token, email: data.email })

    },
    signup: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return
        }

        const data = matchedData(req)

        //VERIFICANDO SE E-MAIL EXISTE
        const user = await User.findOne({
            email: data.email
        })
        if (user) {
            res.json({
                error: { email: { msg: 'E-mail já cadastrado' } }
            })
            return
        }

        //VERIFICANDO SE ESTADO EXISTE
        if (mongoose.Types.ObjectId.isValid(data.state)) {
            const stateItem = await State.findById(data.state)
            if (!stateItem) {
                res.json({
                    error: { state: { msg: 'Estado não existe' } }
                })
                return
            }
        } else {
            res.json({
                error: { state: { msg: 'Estado Inválido' } }
            })
            return
        }

        //HASH DA SENHA
        const passwordHash = await bcrypt.hash(data.password, 10)

        //CRIANDO TOKEN
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        //INSERINDO USUÁRIO NO BANCO
        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
            token: token,
            state: data.state
        })
        await newUser.save()

        res.json({ token })
    }
}