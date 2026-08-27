const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET manquant : vérifiez votre fichier .env");
  process.exit(1);
}

const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/request.routes");
const subjectRoutes = require("./routes/subject.routes");
const tutorRoutes = require("./routes/tutor.routes");

const app = express();
const server = http.createServer(app);

// Configuration Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Charger les événements Socket.IO
require("./sockets")(io);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API ESI-Connect" });
});

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tutors", tutorRoutes);

// Middleware 404 JSON
app.use((req, res) => {
  res.status(404).json({
    message: `La route HTTP ${req.method} ${req.originalUrl} n'existe pas sur le serveur.`
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
