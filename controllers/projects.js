const path = require("path");
const devProjects = require("../models/Projects");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
// @desc    = fetch all projects data
// @route   = /api/projects
// access   = public
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await devProjects.find();
  res.status(200).json({ success: true, data: projects });
});

// @desc    = add a project
// @route   = /api/projects
// @access  = privet
exports.createProject = asyncHandler(async (req, res, next) => {
  const projectData = req.body;

  const results = await devProjects.create(projectData);

  res.status(201).json({ success: true, data: results });
  console.log(results._id);
});

// @desc    = single project find
// @route   = /api/projects/:id
// @access  = public
exports.getProject = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const query = await devProjects.findById(id);
  res.status(200).json({ success: true, data: query });
});

// @desc    = filter by category
// @@route  = /api/projects/?category=MERN-stack
// @access  = public
exports.getProjectByCat = asyncHandler(async (req, res, next) => {
  const category = req.query;
  const results = await devProjects.find(category);
  res.status(200).json({ success: true, data: results });
});

// @desc    = delete a projects
// @route   = /api/projects/:id
// @access  = privet
exports.removeProject = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const query = await devProjects.deleteOne({ _id: id });
  res.status(200).json({ success: true, data: query });
});

// @desc  = upload file
// @route = /api/projects/:id/photo
// access = privet
exports.uploadProjectPhoto = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // check that file was not upload
  if (!req.files) {
    return next(new ErrorResponse("Please Upload A Image", 400));
  }

  const file = req.files.image;

  // make sure that the file is an actual image
  if (!file.mimetype.startsWith("image")) {
    return next(
      new ErrorResponse("You have to upload a image file not others", 400)
    );
  }
  // check file size
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(new ErrorResponse("File size should be 1MB"));
  }
  // create custom photo name
  file.name = `photo_${id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_LOCATION}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("Problem with file upload", 500));
    }

    const upload = await devProjects.findByIdAndUpdate(id, {
      image: file.name,
    });

    res.status(200).json(upload);
  });
});
