const express = require("express");
const router = express.Router();

const {
    getRequests,
    getPendingRequests,
    getRequestById,
    createRequest,
      deleteRequest
} = require("../controllers/requestsController");

router.get("/", getRequests);
router.post("/", createRequest);
router.get("/pending", getPendingRequests);

router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

module.exports = router;