const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskcontroller');

router.get('/',auth, taskController.getAllTasks);
router.get('/:id',auth, taskController.getTaskById);
router.post('/',auth, taskController.createTask);
router.put('/:id',auth, taskController.updateTask);
router.delete('/:id',auth, taskController.deleteTask);

router.get('/id/:name',auth, taskController.getTaskIdByName);

module.exports = router;