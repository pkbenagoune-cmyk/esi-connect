const validateRequest = require("../middlewares/validateRequest");
const express = require("express");
const router = express.Router();

const {
    getAllRequests,
    getPendingRequests,
    getRequestById,
    createRequest,
    acceptRequest,
    completeRequest,
      getPublicCompletedRequests
} = require("../controllers/requestsController");

// GET
router.get("/", getAllRequests);
router.get("/pending", getPendingRequests);
router.get("/:id", getRequestById);

// POST
router.post("/", validateRequest, createRequest);

// PATCH
router.patch("/:id/accept", acceptRequest);
router.patch("/:id/respond", completeRequest);

module.exports = router;