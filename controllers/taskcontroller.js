const Task = require('../models/Task');


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTaskById = (req, res) => {
    const tasks = readData();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
        return;
    }
    res.send(task);
}

exports.createTask = (req, res) => {
    const tasks = readData();

    const { name, completed = false } = req.body;

    const newTask = {
        id: tasks.length + 1, 
        name: name,       
        completed: completed  
    };

    tasks.push(newTask);
    writeData(tasks);
    res.status(201).json(newTask); 
};

exports.updateTask = (req, res) => {
    const tasks = readData();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
        return;
    }

    const { name, completed = false } = req.body;

    task.name = name;
    task.completed = completed;

    writeData(tasks);
    res.status(200).json(tasks[task.id]);
}

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