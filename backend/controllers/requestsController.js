const pool = require("../config/db");
console.log("TYPE DE POOL:", typeof pool);
console.log("POOL:", pool);
const getAllRequests = async (req, res) => {
    try {

        const { subjectId, status } = req.query;

        let query = `
            SELECT
                tr.id,
                tr.title,
                tr.description,
                tr.difficulty,
                tr.status,
                tr.created_at,

                s.name AS subject_name,

                student.first_name AS student_first_name,
                student.last_name AS student_last_name,

                tutor.first_name AS tutor_first_name,
                tutor.last_name AS tutor_last_name

            FROM tutoring_requests tr

            JOIN subjects s
                ON tr.subject_id = s.id

            JOIN users student
                ON tr.student_id = student.id

            LEFT JOIN users tutor
                ON tr.tutor_id = tutor.id
        `;

        const values = [];
        const conditions = [];

        if (subjectId) {
            values.push(subjectId);
            conditions.push(`tr.subject_id = $${values.length}`);
        }

        if (status) {
            values.push(status);
            conditions.push(`tr.status = $${values.length}`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += ` ORDER BY tr.created_at DESC`;

        const result = await pool.query(query, values);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur serveur."
        });

    }
};

module.exports = {
    getAllRequests
};
const getPendingRequests = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                tr.id,
                tr.title,
                tr.description,
                tr.difficulty,
                tr.status,
                tr.created_at,

                s.name AS subject_name,

                student.first_name AS student_first_name,
                student.last_name AS student_last_name,

                tutor.first_name AS tutor_first_name,
                tutor.last_name AS tutor_last_name

            FROM tutoring_requests tr

            JOIN subjects s
                ON tr.subject_id = s.id

            JOIN users student
                ON tr.student_id = student.id

            LEFT JOIN users tutor
                ON tr.tutor_id = tutor.id

            WHERE tr.status = 'PENDING'

            ORDER BY tr.created_at DESC
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur serveur."
        });

    }
};


const getRequestById = async (req, res) => {

    try {

        const result = await pool.query(

            `
            SELECT
                tr.id,
                tr.title,
                tr.description,
                tr.difficulty,
                tr.status,
                tr.created_at,

                s.name AS subject_name,

                student.first_name AS student_first_name,
                student.last_name AS student_last_name,

                tutor.first_name AS tutor_first_name,
                tutor.last_name AS tutor_last_name

            FROM tutoring_requests tr

            JOIN subjects s
                ON tr.subject_id = s.id

            JOIN users student
                ON tr.student_id = student.id

            LEFT JOIN users tutor
                ON tr.tutor_id = tutor.id

            WHERE tr.id = $1
            `,

            [req.params.id]

        );

        if(result.rows.length===0){

            return res.status(404).json({
                message:"Demande introuvable."
            });

        }

        res.json(result.rows[0]);

    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Erreur serveur."
        });

    }

}
// ✅ AJOUTE CECI AUTOUR de ton code :
const createRequest = async (req, res) => {
    try {
        // Récupère les données du body (ou adapte selon ton besoin)
        const { studentId, subjectId, title, description, difficulty, preferredDate } = req.body;

        const result = await pool.query(
            `
            INSERT INTO tutoring_requests
            (
                student_id,
                subject_id,
                title,
                description,
                difficulty,
                preferred_date
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING *;
            `,
            [
                studentId,
                subjectId,
                title.trim(),
                description.trim(),
                difficulty,
                preferredDate || null
            ]
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




const acceptRequest = async (req, res) => {

    try {

        const { tutorId } = req.body;

        const result = await pool.query(

            `
            UPDATE tutoring_requests

            SET
                status = 'ACCEPTED',
                tutor_id = $1,
                updated_at = CURRENT_TIMESTAMP

            WHERE
                id = $2
                AND status = 'PENDING'

            RETURNING *;
            `,

            [
                tutorId,
                req.params.id
            ]

        );

        if(result.rows.length === 0){

            return res.status(400).json({
                message:"Cette demande n'est plus disponible."
            });

        }

        res.json({
            message:"Demande acceptée.",
            request: result.rows[0]
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Erreur serveur."
        });

    }

};
const completeRequest = async (req, res) => {

    try {

        const { tutorResponse } = req.body;

        // Validation
        if (!tutorResponse || tutorResponse.trim() === "") {
            return res.status(400).json({
                message: "La réponse ne peut pas être vide."
            });
        }

        const result = await pool.query(

            `
            UPDATE tutoring_requests

            SET
                tutor_response = $1,
                response_at = CURRENT_TIMESTAMP,
                status = 'COMPLETED',
                updated_at = CURRENT_TIMESTAMP

            WHERE
                id = $2
                AND status = 'ACCEPTED'

            RETURNING *;
            `,

            [
                tutorResponse,
                req.params.id
            ]

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

        res.status(500).json({
            message: "Erreur serveur."
        });

    }

};
module.exports = {
  getAllRequests,
  getPendingRequests,
  getRequestById,
  createRequest,
  acceptRequest,
  completeRequest
};


