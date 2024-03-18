const express = require("express");
const {
  getProjects,
  createProject,
  getProject,
  removeProject,
} = require("../controllers/projects");
const router = express.Router();

router.route("/").get(getProjects);
router.route("/").post(createProject);
router.route("/:id").get(getProject);
router.route("/:id").delete(removeProject);
module.exports = router;
