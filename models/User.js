const mongoose = require('mongoose');

const userEsquema = mongoose.Schema({
    nome: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 10, maxlength: 100 },
    senha: { type: String, required: true, minlength: 6, maxlength: 100 },
    admin: {type: Boolean, default: false},
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userEsquema);