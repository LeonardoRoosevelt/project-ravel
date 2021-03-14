const express = require('express')
const router = express.Router()
const productController = require('../controllers/api/productController')
const priceController = require('../controllers/api/priceController')
router.post('/product', productController.createProduct)
router.get('/product/:id', productController.getProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)
router.post('/products', productController.searchProducts)
router.post('/price', priceController.createPrice)
router.get('/price/:id', priceController.getPrice)
router.put('/price/:id', priceController.updatePrice)
router.delete('/price/:id', priceController.deletePrice)
module.exports = router
