const express = require("express");
const router = express.Router();

const { home } = require("../controllers/indexController");

// Importation de toutes les routes
const authRoutes = require("./auth.routes");
const requestRoutes = require("./request.routes");
const subjectRoutes = require("./subject.routes");
const tutorRoutes = require("./tutor.routes");
const ratingRoutes = require("./rating.route");

// Route de base
router.get("/", home);

// Dispatch vers chaque sous-route
router.use("/auth", authRoutes);
router.use("/requests", requestRoutes);
router.use("/subjects", subjectRoutes);
router.use("/tutors", tutorRoutes);
router.use("/ratings", ratingRoutes); 

module.exports = router;