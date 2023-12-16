const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Database Connected Sucessfully!");
  } catch (error) {
    console.log("Error occured in db!", error);
  }
}

module.exports = { dbConnect };

