const express = require("express");
const router = express.Router();

const {
  createRating,
  updateRating,
  getRating
} = require("../controllers/rating.controller");

router.post("/:id/rating", createRating);
router.patch("/:id/rating", updateRating);
router.get("/:id/rating", getRating);

module.exports = router;