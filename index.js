const express = require("express");
const config = require("./app/configs/env.config");
require("./app/configs/mongo.config");
require("./app/configs/redis.config");
const rootRouter = require("./app/routes");
const app = express();
const PORT = config.port;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});

app.use(rootRouter);

app.get("/healthz", (req, res) => {
  return res.send({ ok: true });
});
