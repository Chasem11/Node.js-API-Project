﻿# Node.js-API-Project

# Task Manager API

This is a simple Task Manager API built with Node.js and Express. The API allows you to create, read, update, and delete (CRUD) tasks. It also includes an endpoint to retrieve a task's ID by its name.

## Features

- **Create a task**: Add a new task to the task list.
- **Read tasks**: Retrieve all tasks or a specific task by ID.
- **Update tasks**: Mark tasks as completed or update task details.
- **Delete tasks**: Remove tasks from the task list.
- **Retrieve task ID by name**: Get the ID of a task by providing its name.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) for the database
- [Postman](https://www.postman.com/) (or any API testing tool) for testing endpoints

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   
2. **Navigate to the project directory**:

   ```bash
   cd task-manager-api

3. **Install the dependencies**:

   ```bash
   npm install

4. **Set up environment variables**:

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/taskmanager
   PORT=3000

5. **Start the server**:

   ```bash
   npm start
   
### Endpoints

#### **Get All Tasks**

- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Retrieves all tasks.

#### **Create a New Task**

- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task.
- **Body**:

   ```json
   {
     "name": "Task Name"
   }

#### **Get Task by ID**

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieves a task by its ID.

#### **Update Task**

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates a task (e.g., marks it as completed).
- **Body**:

   ```json
   {
     "completed": true
   }
   
#### **Delete Task**

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.

#### **Get Task ID by Name**

- **URL**: `/tasks/id/:name`
- **Method**: `GET`
- **Description**: Retrieves the ID of a task by its name.

