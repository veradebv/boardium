// controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert into DB (use password_hash column)
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // find user by email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
