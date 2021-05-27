const MeController = require('../app/controllers/MeController')
const express = require('express')
const router = express.Router()
router.get('/login',MeController.login)
router.post('/login',MeController.loginWithAccount)
router.post('/signup',MeController.signup)
router.get('/shop-cart',MeController.shopcart)
router.get('/logout',MeController.logout)
module.exports = router