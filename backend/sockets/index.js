const jwt = require("jsonwebtoken");
const pool = require("../config/db");

module.exports = (io) => {
  // =========================================================
  // MIDDLEWARE D'AUTHENTIFICATION SOCKET.IO
  // =========================================================
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Token manquant."));
    }

    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET || "votre_cle_secrete");
      next();
    } catch (error) {
      next(new Error("Token invalide."));
    }
  });

  // =========================================================
  // NOUVELLE CONNEXION
  // =========================================================
  io.on("connection", (socket) => {
    console.log(`Connecté : ${socket.user.email}`);

    // =======================================================
    // ROOM PERSONNELLE — pour notifier l'utilisateur
    // où qu'il soit dans l'application (Bonus 2)
    // =======================================================
    socket.join("user-" + socket.user.id);

    // =======================================================
    // REJOINDRE UNE CONVERSATION
    // =======================================================
    socket.on("join-conversation", async (requestId) => {
      try {
        const result = await pool.query(
          `SELECT id
           FROM tutoring_requests
           WHERE id = $1
           AND tutor_id IS NOT NULL
           AND (student_id = $2 OR tutor_id = $2)`,
          [requestId, socket.user.id]
        );

        if (result.rows.length === 0) {
          return socket.emit(
            "error-message",
            "Accès refusé à cette conversation."
          );
        }

        socket.join(`request-${requestId}`);
      } catch (error) {
        console.error(error);
        socket.emit("error-message", "Erreur serveur.");
      }
    });

    // =======================================================
    // QUITTER UNE CONVERSATION
    // =======================================================
    socket.on("leave-conversation", (requestId) => {
      socket.leave(`request-${requestId}`);
    });

    // =======================================================
    // UTILISATEUR EN TRAIN D'ÉCRIRE
    // =======================================================
    socket.on("typing", ({ requestId }) => {
      socket.to(`request-${requestId}`).emit("user-typing", {
        userId: socket.user.id,
      });
    });

    // =======================================================
    // ENVOYER UN MESSAGE
    // =======================================================
    socket.on("send-message", async ({ requestId, content }) => {
      try {
        // 1. Vérifier que le message n'est pas vide
        if (!content || !content.trim()) {
          return socket.emit(
            "error-message",
            "Le message ne peut pas être vide."
          );
        }

        // 2. Vérifier que l'utilisateur est participant
        //    (on récupère aussi student_id/tutor_id pour le Bonus 2)
        const autorise = await pool.query(
          `SELECT student_id, tutor_id
           FROM tutoring_requests
           WHERE id = $1
           AND tutor_id IS NOT NULL
           AND (student_id = $2 OR tutor_id = $2)`,
          [requestId, socket.user.id]
        );

        if (autorise.rows.length === 0) {
          return socket.emit("error-message", "Accès refusé.");
        }

        const { student_id, tutor_id } = autorise.rows[0];

        // 3. Enregistrer le message dans PostgreSQL
        const result = await pool.query(
          `INSERT INTO messages
             (request_id, sender_id, content)
           VALUES
             ($1, $2, $3)
           RETURNING *`,
          [requestId, socket.user.id, content.trim()]
        );

        // 4. Construire l'objet envoyé aux clients
        const message = {
          ...result.rows[0],
          sender_first_name: socket.user.firstName ?? null,
          sender_last_name: socket.user.lastName ?? null,
        };

        // 5. Envoyer le nouveau message à toute la room
        //    (expéditeur inclus)
        io.to(`request-${requestId}`).emit(
          "new-message",
          message
        );

        // 6. Notifier le destinataire dans sa room personnelle
        //    (Bonus 2 — peu importe où il se trouve dans l'app)
        const destinataireId =
          socket.user.id === student_id ? tutor_id : student_id;

        io.to("user-" + destinataireId).emit("unread-notification", {
          requestId,
          preview: message.content.slice(0, 50),
        });
      } catch (error) {
        console.error(error);
        socket.emit("error-message", "Erreur serveur.");
      }
    });

    // =======================================================
    // DÉCONNEXION
    // =======================================================
    socket.on("disconnect", () => {
      console.log(`Déconnecté : ${socket.user.email}`);
    });
  });
};