const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const{ createList, udpateList, updateListOrder, deleteList } = require('../controllers/listController');

router.post('/', auth, createList);
router.put('/:id', auth, updateList);
router.put('/order', auth, updateListOrder);
router.delete('/:id', auth, deleteList);

module.exports = router;