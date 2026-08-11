const pool = require("../config/db");

const createRequest = async (req, res) => {
  try {
    // SEMAINE 4 : l'identité vient encore du corps de la requête.
    // En semaine 5, elle viendra du token (req.user.id).
    const { studentId, subjectId, title, description, difficulty, preferredDate } = req.body;

    if (!subjectId || !title || !description || !difficulty) {
      return res.status(400).json({ message: "Champs obligatoires manquants." });
    }

    const result = await pool.query(
      `INSERT INTO tutoring_requests
       (student_id, subject_id, title, description, difficulty, preferred_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDING')
       RETURNING *`,
      [studentId, subjectId, title, description, difficulty, preferredDate || null]
    );

    res.status(201).json({
      message: "Demande créée avec succès.",
      request: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const studentId = req.query.studentId;   // provisoire : viendra du token

    const result = await pool.query(
      `SELECT tr.*, s.name AS subject_name, u.first_name AS tutor_first_name, u.last_name AS tutor_last_name
       FROM tutoring_requests tr
       JOIN subjects s ON tr.subject_id = s.id
       LEFT JOIN users u ON tr.tutor_id = u.id
       WHERE tr.student_id = $1
       ORDER BY tr.created_at DESC`,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tr.*, s.name AS subject_name, u.first_name AS student_first_name, u.last_name AS student_last_name
       FROM tutoring_requests tr
       JOIN subjects s ON tr.subject_id = s.id
       JOIN users u ON tr.student_id = u.id
       WHERE tr.status = 'PENDING'
       ORDER BY tr.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { tutorId } = req.body;   // provisoire : viendra du token

    const result = await pool.query(
      `UPDATE tutoring_requests
       SET status = 'ACCEPTED',
           tutor_id = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       AND status = 'PENDING'
       RETURNING *`,
      [tutorId, requestId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Cette demande n'est plus disponible."
      });
    }

    res.json({
      message: "Demande acceptée.",
      request: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getTutorRequests = async (req, res) => {
  try {
    const tutorId = req.query.tutorId;   // provisoire : viendra du token

    const result = await pool.query(
      `SELECT tr.*, s.name AS subject_name, u.first_name AS student_first_name, u.last_name AS student_last_name
       FROM tutoring_requests tr
       JOIN subjects s ON tr.subject_id = s.id
       JOIN users u ON tr.student_id = u.id
       WHERE tr.tutor_id = $1
       ORDER BY tr.created_at DESC`,
      [tutorId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const completeRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { tutorId } = req.body;   // provisoire : viendra du token

    const result = await pool.query(
      `UPDATE tutoring_requests
       SET status = 'COMPLETED',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       AND tutor_id = $2
       AND status = 'ACCEPTED'
       RETURNING *`,
      [requestId, tutorId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Impossible de terminer cette demande."
      });
    }

    res.json({
      message: "Demande terminée.",
      request: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { tutorId, tutorResponse } = req.body;   // tutorId provisoire : viendra du token

    if (!tutorResponse || !tutorResponse.trim()) {
      return res.status(400).json({ message: "La réponse ne peut pas être vide." });
    }

    const result = await pool.query(
      `UPDATE tutoring_requests
       SET tutor_response = $1,
           response_at = CURRENT_TIMESTAMP,
           status = 'COMPLETED',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       AND tutor_id = $3
       AND status = 'ACCEPTED'
       RETURNING *`,
      [tutorResponse.trim(), requestId, tutorId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Impossible de répondre à cette demande."
      });
    }

    res.json({
      message: "Réponse envoyée et demande terminée.",
      request: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getPublicCompletedRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tr.id, tr.title, tr.description, tr.difficulty, tr.status,
              tr.tutor_response, tr.created_at, tr.response_at,
              s.name AS subject_name,
              st.first_name AS student_first_name, st.last_name AS student_last_name,
              tu.first_name AS tutor_first_name, tu.last_name AS tutor_last_name
       FROM tutoring_requests tr
       JOIN subjects s ON tr.subject_id = s.id
       JOIN users st ON tr.student_id = st.id
       JOIN users tu ON tr.tutor_id = tu.id
       WHERE tr.status = 'COMPLETED'
       AND tr.tutor_response IS NOT NULL
       AND TRIM(tr.tutor_response) != ''
       ORDER BY tr.response_at DESC NULLS LAST`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getPublicStats = async (req, res) => {
  try {
    const requestsResult = await pool.query(`
      SELECT
        COUNT(*)                                          AS total_requests,
        COUNT(*) FILTER (WHERE status = 'COMPLETED')     AS completed_requests,
        COUNT(*) FILTER (WHERE status = 'PENDING')       AS pending_requests
      FROM tutoring_requests
    `);

    const tutorsResult = await pool.query(
      `SELECT COUNT(*) AS total_tutors FROM users WHERE role = 'TUTOR'`
    );

    const subjectsResult = await pool.query(
      `SELECT COUNT(*) AS total_subjects FROM subjects`
    );

    const popularSubjectsResult = await pool.query(`
      SELECT s.name, COUNT(tr.id) AS request_count
      FROM subjects s
      LEFT JOIN tutoring_requests tr ON tr.subject_id = s.id
      GROUP BY s.id, s.name
      ORDER BY request_count DESC
      LIMIT 6
    `);

    res.json({
      totalRequests:     parseInt(requestsResult.rows[0].total_requests),
      completedRequests: parseInt(requestsResult.rows[0].completed_requests),
      pendingRequests:   parseInt(requestsResult.rows[0].pending_requests),
      totalTutors:       parseInt(tutorsResult.rows[0].total_tutors),
      totalSubjects:     parseInt(subjectsResult.rows[0].total_subjects),
      popularSubjects:   popularSubjectsResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getPendingRequests,
  acceptRequest,
  getTutorRequests,
  completeRequest,
  respondToRequest,
  getPublicCompletedRequests,
  getPublicStats
};