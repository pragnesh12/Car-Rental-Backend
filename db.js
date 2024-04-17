const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://Pragnesh:4riCYFcGlxaudzmT@cluster0.a5k3605.mongodb.net/ReLive-Udamy"
    // "mongodb+srv://Pragnesh:4riCYFcGlxaudzmT@cluster0.a5k3605.mongodb.net/ReLive-Udamy"
  );
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("Mongo DB connected successfully");
  });
  connection.on("error", () => {
    console.log("Mongo DB Not connected successfully");
  });
}
connectDB();
module.exports = mongoose;
