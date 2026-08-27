const pool = require("../config/db");

async function getConversationIfParticipant(requestId, userId) {
  const result = await pool.query(
    `SELECT id, student_id, tutor_id, status
     FROM tutoring_requests
     WHERE id = $1
     AND tutor_id IS NOT NULL
     AND (student_id = $2 OR tutor_id = $2)`,
    [requestId, userId]
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

const getMessages = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const conversation = await getConversationIfParticipant(requestId, req.user.id);

    if (!conversation) {
      return res.status(404).json({ message: "Demande introuvable." });
    }

    const since = req.query.since ? Number(req.query.since) : 0;

    const result = await pool.query(
      `SELECT m.id,
              m.content,
              m.created_at,
              m.read_at,
              m.sender_id,
              u.first_name AS sender_first_name,
              u.last_name AS sender_last_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.request_id = $1
       AND m.id > $2
       ORDER BY m.created_at ASC`,
      [requestId, since]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const sendMessage = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const content = req.body.content;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Le message ne peut pas être vide." });
    }

    const conversation = await getConversationIfParticipant(requestId, req.user.id);

    if (!conversation) {
      return res.status(404).json({ message: "Demande introuvable." });
    }

    const result = await pool.query(
      `INSERT INTO messages (request_id, sender_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, request_id, sender_id, content, created_at, read_at`,
      [requestId, req.user.id, content.trim()]
    );

    const messageResult = await pool.query(
      `SELECT m.id,
              m.request_id,
              m.content,
              m.created_at,
              m.read_at,
              m.sender_id,
              u.first_name AS sender_first_name,
              u.last_name AS sender_last_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.id = $1`,
      [result.rows[0].id]
    );

    res.status(201).json({
      message: "Message envoyé.",
      data: messageResult.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const markMessagesAsRead = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const conversation = await getConversationIfParticipant(requestId, req.user.id);

    if (!conversation) {
      return res.status(404).json({ message: "Demande introuvable." });
    }

    const result = await pool.query(
      `UPDATE messages
       SET read_at = CURRENT_TIMESTAMP
       WHERE request_id = $1
       AND sender_id != $2
       AND read_at IS NULL`,
      [requestId, req.user.id]
    );

    res.json({
      message: "Messages marqués comme lus.",
      count: result.rowCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT tr.id AS request_id, 
              tr.title, 
              tr.status, 
              s.name AS subject_name,
              autre.first_name AS other_first_name,
              autre.last_name AS other_last_name,
              (SELECT m2.content FROM messages m2 WHERE m2.request_id = tr.id ORDER BY m2.created_at DESC LIMIT 1) AS last_message,
              (SELECT m2.created_at FROM messages m2 WHERE m2.request_id = tr.id ORDER BY m2.created_at DESC LIMIT 1) AS last_message_at,
              (SELECT COUNT(*) FROM messages m3 WHERE m3.request_id = tr.id AND m3.sender_id != $1 AND m3.read_at IS NULL) AS unread_count
       FROM tutoring_requests tr
       JOIN subjects s ON tr.subject_id = s.id
       JOIN users autre ON autre.id = CASE WHEN tr.student_id = $1 THEN tr.tutor_id ELSE tr.student_id END
       WHERE tr.tutor_id IS NOT NULL
       AND (tr.student_id = $1 OR tr.tutor_id = $1)
       ORDER BY last_message_at DESC NULLS LAST`,
      [userId]
    );

    const conversations = result.rows.map(conv => ({
      ...conv,
      unread_count: parseInt(conv.unread_count, 10)
    }));

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  getConversationIfParticipant,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  getConversations
};