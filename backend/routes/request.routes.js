const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

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
  createRating,
  updateRating,
  getRating
} = require("../controllers/rating.controller");

// Routes publiques — AVANT le router.use
router.get("/completed/public", getPublicCompletedRequests);
router.get("/stats/public", getPublicStats);

// Tout ce qui suit exige d'être connecté
router.use(authMiddleware);

// Les deux rôles — l'autorisation se fait par PARTICIPATION, en SQL
router.get("/conversations", getConversations);

// Réservé aux étudiants
router.post("/", authorizeRoles("STUDENT"), createRequest);
router.get("/my", authorizeRoles("STUDENT"), getMyRequests);
router.post("/:id/rating", authorizeRoles("STUDENT"), createRating);
router.patch("/:id/rating", authorizeRoles("STUDENT"), updateRating);

// Réservé aux tuteurs
router.get("/pending", authorizeRoles("TUTOR"), getPendingRequests);
router.get("/tutor/my", authorizeRoles("TUTOR"), getTutorRequests);
router.patch("/:id/accept", authorizeRoles("TUTOR"), acceptRequest);
router.patch("/:id/respond", authorizeRoles("TUTOR"), respondToRequest);
router.patch("/:id/complete", authorizeRoles("TUTOR"), completeRequest);

// Les deux rôles — participation vérifiée dans le controller
router.get("/:id/messages", getMessages);
router.post("/:id/messages", sendMessage);
router.patch("/:id/messages/read", markMessagesAsRead);
router.get("/:id/rating", getRating);

module.exports = router;
