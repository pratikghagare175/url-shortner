const { Router } = require("express");
const { createShortLink } = require("../controllers/shortlink.controller");
const router = Router();

router.post("/create", createShortLink);

module.exports = router;
