const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    content: { type: String, required: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    order: { type: Number, default: 0 } // for drag & drop ordering
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);