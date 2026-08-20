const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

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

const {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead
} = require("../controllers/message.controller");

const {
  createRating
} = require("../controllers/rating.controller");

// Routes publiques
router.get("/completed/public", getPublicCompletedRequests);
router.get("/stats/public", getPublicStats);

// Routes protégées
router.use(authMiddleware);

router.post("/", createRequest);
router.get("/my", getMyRequests);
router.get("/pending", getPendingRequests);
router.get("/tutor/my", getTutorRequests);
router.get("/conversations", getConversations);

router.patch("/:id/accept", acceptRequest);
router.patch("/:id/respond", respondToRequest);
router.patch("/:id/complete", completeRequest);
router.get("/:id/messages", getMessages);
router.post("/:id/messages", sendMessage);
router.patch("/:id/messages/read", markMessagesAsRead);
router.post("/:id/rating", createRating);

module.exports = router;
