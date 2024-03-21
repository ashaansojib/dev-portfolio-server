const express = require("express");
const {
  getProjects,
  createProject,
  getProject,
  removeProject,
  getProjectByCat,
  uploadProjectPhoto,
} = require("../controllers/projects");
const router = express.Router();

router.route("/").get(getProjects);
router.route("/").post(createProject);
router.route("/search").get(getProjectByCat);
router.route("/:id/photo").put(uploadProjectPhoto);
router.route("/:id").get(getProject);
router.route("/:id").delete(removeProject);
module.exports = router;
