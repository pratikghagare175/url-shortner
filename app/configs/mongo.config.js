const mongoose = require("mongoose");
const config = require("../configs/env.config");

(() => {
  mongoose.connect(config.mongo.uri);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });
})();
