const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('./db'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); 


app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

