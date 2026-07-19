const validateRequest = require("../middlewares/validateRequest");
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
router.post("/",validateRequest, createRequest);
router.get("/pending", getPendingRequests);

router.get("/:id", getRequestById);
router.put("/:id", validateRequest, updateRequest);
router.delete("/:id", deleteRequest);

module.exports = router;