const Task = require('../models/Tasks')
const createError = require('../utils/createError')

const createTask = async (req, res, next) => {
    try{
        const newTask = new Task({
            title: req.body.title,
            user: req.user.id,
            completed: req.body.completed
        })
        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
    }catch(err){
        return next(err)
    }
}


const currentUserTasks = async (req, res, next) => {
    try{
        const tasks = await Task.find({user: req.user.id})
        return res.status(200).json(tasks)
    }catch(err){
        return next(err)
    }
}

const updateTask = async (req, res, next) => {
    try{
        const task = await Task.findById(req.params.taskId).exec()
        if (!task) return next(createError({ status: 404, message: 'Task not found' }));
  
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
            title: req.body.title,
            completed: req.body.completed
        }, {new: true})

        return res.status(200).json(updatedTask)
    }catch(err){
        return next(err)
    }
}

const deleteTask = async (req, res, next) => {
    try{
        const task = await Task.findById(req.params.taskId)
        if (!task) {
            return next(createError({ status: 404, message: 'Task not found' }));
    }
        await Task.findByIdAndDelete(req.params.TaskId)
        return res.status(200).json('Task deleted')
    }catch(err){
        return next(err)
    }
}

module.exports = {createTask, getTasks, currentUserTasks, updateTask, deleteTask}