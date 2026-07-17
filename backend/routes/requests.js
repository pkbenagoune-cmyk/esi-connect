const express = require("express");

const router = express.Router();

const {

    getRequests

} = require("../controllers/requestsController.js");

router.get("/", getRequests);

module.exports = router;