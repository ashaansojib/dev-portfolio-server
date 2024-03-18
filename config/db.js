const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  // log for db connection status
  console.log(`DB Connected: ${conn.connection.host}`.blue.underline);
};

module.exports = connectDB;
