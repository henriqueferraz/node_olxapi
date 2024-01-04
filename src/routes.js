const express = require('express')
const router = express.Router()

const Auth = require('./middlewares/Auth')

const AuthValidator = require('./validators/AuthValidators')
const UserValidators = require('./validators/UserValidators')

const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserControlles')
const AdsController = require('./controllers/AdsController')


router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.get('/states', UserController.getStates)

router.post('/user/signin', AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

router.get('/user/me', Auth.private, UserController.info)
router.put('/user/me', UserValidators.editAction_val, Auth.private, UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', Auth.private, AdsController.addAction)
router.get('/ad/list', Auth.private, AdsController.getList)
router.get('/ad/item', Auth.private, AdsController.getItem)
router.get('/ad/:id', Auth.private, AdsController.editActionAd)

module.exports = router