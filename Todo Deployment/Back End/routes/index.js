const router = require("express").Router();
const taskRoutes = require('./tasks')
const authRoutes = require('./auth')
const usersRoutes = require('./users')
const checkAuth = require('../utils/checkAuth')


router.use('/auth', authRoutes)
router.use('/tasks', checkAuth, taskRoutes)
router.use('/users', checkAuth, usersRoutes)


module.exports = router

