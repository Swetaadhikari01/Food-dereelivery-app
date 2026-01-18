const mongoose = require("mongoose");

async function connectDB() {
  try {
    await 
      //mongoose.connect("mongodb://localhost:27017/food-view")
      mongoose.connect(process.env.MONGO_URI)


    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}



module.exports = connectDB;
