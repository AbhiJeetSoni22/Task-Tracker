import Project from "../model/project.model.js"


export const createProject = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  const userProjects = await Project.find({ userId });
  if (userProjects.length >= 4)
    return res.status(400).json({ msg: 'Limit: max 4 projects per user' });

  try {
    const project = await Project.create({ name, userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
