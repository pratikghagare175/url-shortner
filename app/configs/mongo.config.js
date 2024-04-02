const mongoose = require("mongoose");
const config = require("../configs/env.config");

(() => {
  mongoose.connect(config.mongo.uri);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
})();
