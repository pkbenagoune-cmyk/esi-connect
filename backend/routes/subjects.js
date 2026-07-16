const express = require("express");

const router = express.Router();

module.exports = router;
const { getSubjects } = require("../controllers/subjectsController");
router.get("/", getSubjects);