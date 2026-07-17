const express = require("express");
const router = express.Router();

const {
    getRequests,
    getPendingRequests,
    getRequestById
} = require("../controllers/requestsController");

router.get("/", getRequests);

router.get("/pending", getPendingRequests);

router.get("/:id", getRequestById);

module.exports = router;