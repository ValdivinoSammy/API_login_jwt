const mongoose = require('mongoose');

const chatNameEsquema = mongoose.Schema({
    nome: { type: String, required: true, minlength: 3, maxlength: 50 },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatName', chatNameEsquema);