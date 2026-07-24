 const pool = require("../config/db");

const getSubjects = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM subjects
            ORDER BY id;
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur serveur."
        });

    }

};

module.exports = {
    getSubjects
};