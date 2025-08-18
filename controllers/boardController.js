const Board = require('../models/Board');
const List = require('../models/List');

exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user.id })
        .populate({
            path: 'lists',
            populate: { path: 'cards', options: { sort: { order: 1 }}},
            options: { sort: { order: 1 }}
        })
        .sort({ createdAt: -1 });

        res.json(boards);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.createBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const board = await Board.create({ title, user: req.user.id });
        res.status(201).json(board);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};