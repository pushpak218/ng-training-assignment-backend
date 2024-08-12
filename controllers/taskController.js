const Task = require('../models/taskModel');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, completed, assignedTo, status, dueDate, priority, comment } = req.body;

  const newTask = new Task({
    title,
    description,
    completed: completed || false,
    assignedTo,
    status: status || 'Pending',
    dueDate,
    priority: priority || 'Medium',
    comment,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, assignedTo, status, dueDate, priority, comment } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, assignedTo, status, dueDate, priority, comment },
      { new: true }
    );
    if (!updatedTask) return res.status(404).send('Task not found');
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).send('Task not found');
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

