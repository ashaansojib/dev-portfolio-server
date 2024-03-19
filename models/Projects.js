const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please add a name of your project"],
  },
  category: {
    type: String,
    lower: true,
    required: [true, "Please add a Category"],
  },
  links: {
    type: Object,
    required: [true, "Must added server and fron-end git link"],
  },
  image: {
    type: String,
    required: [true, "Add a Image Link"],
  },
  tools: {
    type: Array,
    required: [true, "Must add all tools & packages name"],
  },
  filename: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre("save", function (next) {
  this.filename = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model("devProjects", projectSchema);
