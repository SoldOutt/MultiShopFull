const ProductController = require('../app/controllers/ProductController')
const express = require('express')
const router = express.Router()
router.get('/addProduct',ProductController.showAddProduct)
router.post('/addProduct',ProductController.addProduct)
router.get('/addToCart/:id',ProductController.addToCart)
router.get('/removeOutCart/:id',ProductController.removeOutCart)
router.get('/review',ProductController.reviewProduct)
router.get('/:slug',ProductController.detailProduct)
router.get('/',ProductController.shop)

module.exports = router;
