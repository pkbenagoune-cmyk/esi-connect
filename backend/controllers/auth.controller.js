const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const firstName = req.body.first_name || req.body.firstName;
    const lastName = req.body.last_name || req.body.lastName;
    const { email, password, role } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires."
      });
    }

    const userCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // CORRECTION : password_hash au lieu de password
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, role`,
      [firstName, lastName, email, hashedPassword, role || "student"]
    );

    res.status(201).json({
      message: "Compte créé avec succès.",
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error("Erreur register :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Identifiants incorrects." });
    }

    const user = userResult.rows[0];
    
    // CORRECTION : On compare avec user.password_hash
    const validPassword = await bcrypt.compare(password, user.password_hash || user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Identifiants incorrects." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erreur login :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  register,
  login
};