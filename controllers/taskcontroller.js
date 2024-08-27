const Task = require('../models/Task');


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ messagee: 'Error getting task', error: error });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).send('Task not found');
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ messagee: 'Error getting task', error: error });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            completed: req.body.completed || false
        });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ messagee: 'Error creating task', error: error });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            res.status(404).send('Task not found');
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).send('Task not found');
            return;
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ messagee: 'Error deleting task', error: error });
    }
};

exports.getTaskIdByName = async (req, res) => {
    try {
        const task = await Task.findOne({ name: req.params.name });
        if (!task) {
            res.status(404).send('Task not found');
            return;
        }
        res.status(200).json({ id: task._id });
    } catch (error) {
        res.status(500).json({ messagee: 'Error getting task', error: error });
    }
};