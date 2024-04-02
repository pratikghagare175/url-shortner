const { Router } = require("express");
const shorlinkRouter = require("./shortlink.route");
const router = Router();

router.use(shorlinkRouter);

module.exports = router;
