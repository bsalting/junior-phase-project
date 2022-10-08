const express = require("express");
const router = express.Router();

router.use("/campuses", require("./campuses"));
router.use("/students", require("./students"));

module.exports = router;
