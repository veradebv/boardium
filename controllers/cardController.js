const Card = require('../models/Card');
const List = require('../models/List');

exports.createCard = async (req, res) => {
    try {
        const { content, listId } = req.body;

        const maxOrder = await Card.find({ list: listId }).sort({ order: -1 })
        const order = maxOrder.length ? maxOrder[0].order + 1 : 0;

        const card = await Card.create({ content, list: listId, order });
        await List.findByIdAndUpdate(listId, { $push: { cards: card._id }});

        res.status(201).json(card);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateCard = async (req,res) => {
    try {
        const { content, order } = req.body;
        const card = await Card.findByIdAndUpdate(req.params.id, { content, order }, { new: true });
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: 'Service error', error: err.message });
    }
};

exports.updateCardsOrder = async (req,res) => {
    try {
        const {cards } = req.body; // [{ id, order}]
        const ops = cards.map(c => Card.updateOne({ _id: c.id }, { order: c.order }));
        await Promise.all(ops);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        await card.remove();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};