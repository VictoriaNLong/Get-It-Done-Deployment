const router = require("express").Router();
const {register, login, logout, isLoggedIn} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/is_logged_in', isLoggedIn)

module.exports = router