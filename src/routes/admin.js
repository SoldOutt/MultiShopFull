const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/AdminController')
router.get('/',adminController.show)
router.get('/deleteUser/:id',adminController.deleteUser)
router.get('/deleteProduct/:id',adminController.deleteProduct)
router.get('/deleteCart',adminController.deleteCart)
module.exports = router