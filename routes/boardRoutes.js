const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // ⬅️ protect with JWT
const { getBoards, createBoard } = require('../controllers/boardController');

// GET /api/boards → Get all boards of the logged-in user
router.get('/', auth, getBoards);

// POST /api/boards → Create a new board
router.post('/', auth, createBoard);

module.exports = router;