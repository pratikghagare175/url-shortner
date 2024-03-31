const { Router } = require("express");
const shorlinkRouter = require("./shortlink.route");
const trackingRouter = require("./tracking.route");
const router = Router();

router.use(shorlinkRouter);
router.use("/tracking", trackingRouter);

module.exports = router;
