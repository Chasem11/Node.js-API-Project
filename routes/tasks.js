const express  = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.get('/id/:name', taskController.getTaskIdByName);

module.exports = router;