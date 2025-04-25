import Task from '../model/task.model.js';

export const createTask = async (req, res) => {
  const { projectId, title, description, status } = req.body;

  try {
    const task = await Task.create({ projectId, title, description, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const updatedData = { title, description, status };
  if (status === 'Completed') updatedData.completedAt = new Date();

  try {
    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
