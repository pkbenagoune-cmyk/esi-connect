const express = require("express");
const router = express.Router();

const {
  createRequest,
  getMyRequests,
  getPendingRequests,
  acceptRequest,
  getTutorRequests,
  completeRequest,
  respondToRequest,
  getPublicCompletedRequests,
  getPublicStats
} = require("../controllers/request.controller");

// Routes publiques — déclarées avant les routes dynamiques /:id
router.get("/completed/public", getPublicCompletedRequests);
router.get("/stats/public", getPublicStats);

router.post("/", createRequest);

router.get("/my", getMyRequests);

router.get("/pending", getPendingRequests);

router.get("/tutor/my", getTutorRequests);

router.patch("/:id/accept", acceptRequest);

router.patch("/:id/respond", respondToRequest);

router.patch("/:id/complete", completeRequest);

module.exports = router;
