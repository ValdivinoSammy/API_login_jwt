const mongoose = require('mongoose');

const messageEsquema = mongoose.Schema({
    id: { type: String, required: true },
    user: { type: String},
    msg: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserMessage', messageEsquema);