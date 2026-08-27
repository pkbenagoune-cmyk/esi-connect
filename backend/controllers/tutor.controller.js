const pool = require("../config/db");

const getMyStats = async (req, res) => {
  try {
    // Récupérer les statistiques des avis du tuteur connecté
    const ratingsResult = await pool.query(
      `SELECT
         COALESCE(ROUND(AVG(stars)::numeric, 1), 0) AS average_stars,
         COUNT(*) AS total_ratings,
         COUNT(*) FILTER (WHERE stars = 5) AS five,
         COUNT(*) FILTER (WHERE stars = 4) AS four,
         COUNT(*) FILTER (WHERE stars = 3) AS three,
         COUNT(*) FILTER (WHERE stars = 2) AS two,
         COUNT(*) FILTER (WHERE stars = 1) AS one
       FROM ratings
       WHERE tutor_id = $1`,
      [req.user.id]
    );

    // Récupérer le nombre de demandes terminées du tuteur
    const completedResult = await pool.query(
      `SELECT COUNT(*) AS total_completed
       FROM tutoring_requests
       WHERE tutor_id = $1
       AND status = 'COMPLETED'`,
      [req.user.id]
    );

    // Première ligne du résultat SQL
    const ratings = ratingsResult.rows[0];
    const completed = completedResult.rows[0];

    // Envoyer les statistiques au frontend
    res.json({
      averageStars: parseFloat(ratings.average_stars),
      totalRatings: parseInt(ratings.total_ratings, 10),
      totalCompleted: parseInt(completed.total_completed, 10),

      distribution: {
        "5": parseInt(ratings.five, 10),
        "4": parseInt(ratings.four, 10),
        "3": parseInt(ratings.three, 10),
        "2": parseInt(ratings.two, 10),
        "1": parseInt(ratings.one, 10)
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

// ============================================================
// GET /api/tutors/:id/stats
// Statistiques publiques d'un tuteur
// ============================================================
const getTutorStats = async (req, res) => {
  try {
    // L'id du tuteur vient de l'URL :
    // /api/tutors/3/stats
    //
    // req.params.id vaut "3" sous forme de string.
    // On le convertit donc en nombre.
    const tutorId = Number(req.params.id);

    // Vérification simple de l'id
    if (!Number.isInteger(tutorId) || tutorId <= 0) {
      return res.status(404).json({
        message: "Tuteur introuvable."
      });
    }

    // Récupération du prénom et du nom du tuteur
    // ainsi que de ses statistiques.
    const result = await pool.query(
      `SELECT
         u.first_name,
         u.last_name,
         COALESCE(ROUND(AVG(r.stars)::numeric, 1), 0) AS average_stars,
         COUNT(r.id) AS total_ratings,
         COUNT(r.id) FILTER (WHERE r.stars = 5) AS five,
         COUNT(r.id) FILTER (WHERE r.stars = 4) AS four,
         COUNT(r.id) FILTER (WHERE r.stars = 3) AS three,
         COUNT(r.id) FILTER (WHERE r.stars = 2) AS two,
         COUNT(r.id) FILTER (WHERE r.stars = 1) AS one
       FROM users u
       LEFT JOIN ratings r ON r.tutor_id = u.id
       WHERE u.id = $1
       AND u.role = 'TUTOR'
       GROUP BY u.id, u.first_name, u.last_name`,
      [tutorId]
    );

    // Si aucune ligne n'est retournée,
    // le tuteur n'existe pas ou n'a pas le rôle TUTOR.
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tuteur introuvable."
      });
    }

    // Récupération du nombre de demandes terminées.
    const completedResult = await pool.query(
      `SELECT COUNT(*) AS total_completed
       FROM tutoring_requests
       WHERE tutor_id = $1
       AND status = 'COMPLETED'`,
      [tutorId]
    );

    const stats = result.rows[0];

    // On renvoie uniquement les informations publiques.
    res.json({
      firstName: stats.first_name,
      lastName: stats.last_name,

      averageStars: parseFloat(stats.average_stars),
      totalRatings: parseInt(stats.total_ratings, 10),
      totalCompleted: parseInt(
        completedResult.rows[0].total_completed,
        10
      ),

      distribution: {
        "5": parseInt(stats.five, 10),
        "4": parseInt(stats.four, 10),
        "3": parseInt(stats.three, 10),
        "2": parseInt(stats.two, 10),
        "1": parseInt(stats.one, 10)
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};


// ============================================================
const getTutorRanking = async (req, res) => {
  try {
    const C = 10; // constante de confiance — voir justification dans le README

    const result = await pool.query(
      `WITH stats_globales AS (
         SELECT AVG(stars) AS m FROM ratings
       ),
       stats_tuteurs AS (
         SELECT
           u.id AS tutor_id,
           u.first_name,
           u.last_name,
           COUNT(r.id) AS nombre_avis,
           COALESCE(AVG(r.stars), 0) AS moyenne_reelle
         FROM users u
         LEFT JOIN ratings r ON r.tutor_id = u.id
         WHERE u.role = 'TUTOR'
         GROUP BY u.id, u.first_name, u.last_name
       )
       SELECT
         st.tutor_id,
         st.first_name,
         st.last_name,
         st.nombre_avis AS "totalRatings",
         ROUND(st.moyenne_reelle::numeric, 2) AS "averageStars",
         ROUND(
           ($1 * sg.m + st.nombre_avis * st.moyenne_reelle) / ($1 + st.nombre_avis),
           2
         ) AS "bayesianScore"
       FROM stats_tuteurs st, stats_globales sg
       WHERE st.nombre_avis > 0
       ORDER BY "bayesianScore" DESC
       LIMIT 10`,
      [C]
    );

    const classement = result.rows.map((row, index) => ({
      rank: index + 1,
      ...row,
      totalRatings: parseInt(row.totalRatings, 10),
      averageStars: parseFloat(row.averageStars),
      bayesianScore: parseFloat(row.bayesianScore)
    }));

    res.json(classement);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur."
    });
  }
};
module.exports = {
  getMyStats,
  getTutorStats,
  getTutorRanking
};
};