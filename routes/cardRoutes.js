const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createCard, updateCard, updateCardsOrder, deleteCard } = require('../controllers/cardController');

router.post('/', auth, createCard);
router.put('/:id', auth, updateCard);
router.put('/order', auth, updateCardOrder);
router.delete('/:id', auth, deleteCard);

module.exports = router;