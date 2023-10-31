const {getUserInfo} = require('../controllers/user')

const router = require("express").Router();

router.get('/me', getUserInfo)

module.exports = router