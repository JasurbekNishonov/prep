const { Router } = require('express');
const { getUserTransactions, createTransaction } = require("../controllers/transactionController")
const { authenticateToken } = require('../Middleware/jwtMiddleware.js')
const router =  Router()

router.get('/getTransactions', authenticateToken, getUserTransactions)
router.post('/createTransaction', authenticateToken, createTransaction)

module.exports = router