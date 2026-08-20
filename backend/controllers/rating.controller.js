const pool = require("../config/db");

/**
 * Créer un avis
 * POST /api/requests/:id/rating
 */
const createRating = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { stars, comment } = req.body;

    // Vérifier la note
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "La note doit être un entier entre 1 et 5."
      });
    }

    // Vérifier que :
    // - la demande existe
    // - elle appartient à l'utilisateur connecté
    // - elle est COMPLETED
    const demande = await pool.query(
      `SELECT tutor_id
       FROM tutoring_requests
       WHERE id = $1
       AND student_id = $2
       AND status = 'COMPLETED'`,
      [requestId, req.user.id]
    );

    if (demande.rows.length === 0) {
      return res.status(400).json({
        message: "Vous ne pouvez noter que vos propres demandes terminées."
      });
    }

    // Créer l'avis
    const result = await pool.query(
      `INSERT INTO ratings
       (request_id, student_id, tutor_id, stars, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        requestId,
        req.user.id,
        demande.rows[0].tutor_id,
        stars,
        comment?.trim() || null
      ]
    );

    res.status(201).json({
      message: "Merci pour votre avis.",
      rating: result.rows[0]
    });

  } catch (error) {

    // Violation de UNIQUE(request_id)
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Cette demande a déjà été notée."
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

/**
 * Modifier son avis (dans les 24h suivant sa création)
 * PATCH /api/requests/:id/rating
 */
const updateRating = async (req, res) => {
  try {
    // 1. Récupérer l'id de la demande depuis l'URL
    // Exemple : PATCH /api/requests/4/rating
    const requestId = Number(req.params.id);

    // 2. Récupérer les nouvelles valeurs envoyées
    const { stars, comment } = req.body;

    // 3. Vérifier que stars est bien un entier entre 1 et 5
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "La note doit être un entier entre 1 et 5."
      });
    }

    // 4. Mettre à jour l'avis en une seule requête atomique :
    // - il doit appartenir à cette demande (request_id)
    // - il doit avoir été créé par CET utilisateur (student_id)
    // - il doit avoir été créé il y a MOINS de 24 heures
    //
    // Si l'une de ces trois conditions est fausse,
    // aucune ligne n'est modifiée.
    const result = await pool.query(
      `UPDATE ratings
       SET stars = $1, comment = $2
       WHERE request_id = $3
       AND student_id = $4
       AND created_at > NOW() - INTERVAL '24 hours'
       RETURNING *`,
      [stars, comment?.trim() || null, requestId, req.user.id]
    );

    // 5. Si aucune ligne n'a été modifiée :
    // soit l'avis n'existe pas, soit il n'appartient pas
    // à cet utilisateur, soit le délai de 24h est dépassé.
    // On ne distingue pas ces cas dans le message renvoyé.
    if (result.rows.length === 0) {
      return res.status(403).json({
        message: "Modification impossible : avis introuvable ou délai de 24h dépassé."
      });
    }

    // 6. Réponse avec l'avis mis à jour
    res.json({
      message: "Avis mis à jour.",
      rating: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

/**
 * Récupérer l'avis d'une demande
 * GET /api/requests/:id/rating
 */
const getRating = async (req, res) => {
  try {
    const requestId = Number(req.params.id);

    const conversation = await getConversationIfParticipant(
      requestId,
      req.user.id
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Demande introuvable."
      });
    }

    const result = await pool.query(
      `SELECT id,
              request_id,
              student_id,
              tutor_id,
              stars,
              comment,
              created_at
       FROM ratings
       WHERE request_id = $1`,
      [requestId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Aucun avis pour cette demande."
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

/**
 * Helper :
 * Vérifie que l'utilisateur est participant
 * de la conversation d'une demande.
 */
async function getConversationIfParticipant(requestId, userId) {
  const result = await pool.query(
    `SELECT id,
            student_id,
            tutor_id,
            status
     FROM tutoring_requests
     WHERE id = $1
     AND tutor_id IS NOT NULL
     AND (student_id = $2 OR tutor_id = $2)`,
    [requestId, userId]
  );

  return result.rows.length > 0
    ? result.rows[0]
    : null;
}

module.exports = {
  createRating,
  updateRating,
  getRating
};