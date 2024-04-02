const { Router } = require("express");
const { createShortLink, getShortLink } = require("../controllers/shortlink.controller");
const router = Router();

router.post("/create", createShortLink);

router.get("/:shortlink_hash", getShortLink)
module.exports = router;
