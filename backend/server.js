const express = require("express");
const cors = require("cors");
require("dotenv").config();

const requestRoutes = require("./routes/request.routes");
const subjectRoutes = require("./routes/subject.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API ESI-Connect" });
});

app.use("/api/requests", requestRoutes);
app.use("/api/subjects", subjectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
