const List = require('../models/List');
const Card = require('../models/Card');
const Board = require('../models/Board');

exports.createList = async (req, res) => {
    try {
        const { title, boardId } = req.body;

        const maxOrder = await List.find({ board: boardId }).sort({ order: -1 }.limit(1));
        const order = maxOrder.length ? maxOrder[0].order + 1 : 0;

        const list = await List.create({ title, board: boardId, order });
        await Board.findByIdAndUpdate(boardId, {$push: { lists: list._id }});

        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateList = async (req,res) => {
    try {
        const { title, order } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, order }, { new: true });
        res.json(list);
    
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateListOrder = async (req, res) => {
    try {
        const { lists } = req.body;
        const ops = lists.map(l => List.updateOne({ _id: l.id }, { order: l.order }));
        await Promise.all(ops);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteList = async (req, res ) => {
    try {
        const list = await List.findById(req.params.id);
        await Card.deleteMany({ list: list._id }); // delete all cards in list
        await list.remove();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};