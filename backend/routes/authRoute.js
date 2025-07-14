const { Router } = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const { getUser } = require('../controllers/userController')
const { authenticateToken } = require('../Middleware/jwtMiddleware')

const router = Router()

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.get('/user', authenticateToken, getUser)

module.exports = router