const express = require("express");
const router = express.Router();

const {
  getMyStats,
  getTutorStats,
  getTutorReputation
} = require("../controllers/tutor.controller");

// IMPORTANT : /me/stats doit être AVANT /:id/stats
router.get("/me/stats", getMyStats);

router.get("/:id/stats", getTutorStats);

router.get("/:id/reputation", getTutorReputation);

module.exports = router;