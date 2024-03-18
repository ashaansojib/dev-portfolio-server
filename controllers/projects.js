const devProjects = require("../models/Projects");
// @desc    = fetch all projects data
// @route   = /api/projects
// access   = public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await devProjects.find();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

// @desc    = add a project
// @route   = /api/projects
// @access  = privet
exports.createProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    const results = await devProjects.create(projectData);
    res.status(201).json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

// @desc    = single project find
// @route   = /api/projects/:id
// @access  = public
exports.getProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = await devProjects.findById(id);
    res.status(200).json({ success: true, data: query });
  } catch (err) {
    next(err);
  }
};

// @desc    = delete a projects
// @route   = /api/projects/:id
// @access  = privet
exports.removeProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = await devProjects.deleteOne({ _id: id });
    res.status(200).json({ success: true, data: query });
  } catch (err) {
    next(err);
  }
};
