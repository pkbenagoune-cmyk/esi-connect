const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

const {
  getMyStats,
  getTutorStats,
  getTutorRanking
} = require("../controllers/tutor.controller");

// Routes spécifiques d'abord (sinon "me" et "top" seraient pris pour des :id)
router.get("/top", getTutorRanking);                    // publique
router.get("/me/stats", authMiddleware, authorizeRoles("TUTOR"), getMyStats);

// Routes dynamiques ensuite
router.get("/:id/stats", getTutorStats);

module.exports = router;
