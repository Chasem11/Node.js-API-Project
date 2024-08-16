const express = require('express');
const mongoose = require('./db'); 

const app = express();
const port = 3000;

app.use(express.json());

const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
