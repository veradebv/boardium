const mongoose = require('mongoose');
const Board = require('./Board');

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    order: { type: Number, default: 0 } // for drag & drop ordering
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);