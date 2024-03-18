const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 9988;

// load config vars & others
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// load routes
const projects = require("./routes/projects");

// db connection called here
connectDB();

// called middilewares
app.use(express.json());
app.use(cors());

// called routes here
app.use("/api/projects", projects);
app.use("/api/projects/:id", projects);

// error handler must be call after the routes called!!
app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// default routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "The server is running now!" });
});

// listen port here
app.listen(PORT, () => {
  console.log(
    `The server is running in ${process.env.NODE_ENV} on ${process.env.PORT} port!`
      .yellow.bold
  );
});
