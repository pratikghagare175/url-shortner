const convict = require("convict");

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    default: 8080,
    env: "PORT",
  },
  mongo: {
    uri: {
      doc: "Mongodb Connection URI",
      default: "mongodb://localhost:27017",
      env: "MONGODB_URI",
    },
  },
  redis: {
    uri: {
      doc: "Redis Connection URI",
      default: "redis://localhost:6379",
      env: "REDIS_URI",
    },
  },
});

config.validate({ allowed: "strict" });

module.exports = config.get();
