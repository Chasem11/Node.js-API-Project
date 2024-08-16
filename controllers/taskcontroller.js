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
        res.status(500).json({ messagee: 'Error updating task', error: error });
    }
};

exports.deleteTask = (req, res) => {
    const tasks = readData();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
        return;
    }

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    writeData(tasks);
    res.status(200).send();
}