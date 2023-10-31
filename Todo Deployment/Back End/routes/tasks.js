const {createTask, currentUserTasks, updateTask, deleteTask} = require('../controllers/task')

const router = require("express").Router();

router.post('/', createTask)
router.get('/userTasks', currentUserTasks)
router.put('/:taskId', updateTask)
router.delete('/:taskId', deleteTask)


module.exports = router