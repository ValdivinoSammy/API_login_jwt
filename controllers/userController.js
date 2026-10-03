const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidate, loginValidate } = require("./validate");
const ChatName = require('../models/ChatName');
const UserMessage = require('../models/UserMessage');

const userController = {
    register: async function (req, res) {
        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        let selectEmail = await User.findOne({ email: req.body.email });
        if (selectEmail) { return res.status(400).send("Email existente.") };

        let selectNome = await User.findOne({ email: req.body.nome });
        if (selectNome) { return res.status(400).send("Nome de usuario já existente.") };

        const user = new User({
            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha)
        })
        try {
            const userSalvo = await user.save();

            const token = jwt.sign({ _id: userSalvo._id, nome: userSalvo.nome, admin: userSalvo.admin }, process.env.TOKEN_SECRET, { expiresIn: "15d" })
            res.header("auth-token", token)
            res.send(userSalvo.nome);
        } catch (error) {
            res.status(400).res.send(error);
        }

    },
    login: async function (req, res) {
        const { error } = loginValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        let usuario = await User.findOne({ email: req.body.email });
        if (!usuario) return res.status(400).send("Email ou senha incorreta")

        try {
            let senhaIsCorret = bcrypt.compareSync(req.body.senha, usuario.senha);
            if (!senhaIsCorret) return res.status(400).send("Email ou senha incorreta")


            const token = jwt.sign({ _id: usuario._id, nome: usuario.nome, admin: usuario.admin }, process.env.TOKEN_SECRET, { expiresIn: "15d" })
            res.header("auth-token", token)
            res.send(usuario.nome);

        } catch (error) {
            res.status(500).send(error)
        }
    },

    verificar: function (req, res) {
        res.send("Tudo certo.");
    },

    getChatName: async function (req, res) {
        let chatName = await ChatName.find();
        if (!chatName) return res.status(400).send("Nome do chat não encontrado.");

        res.send(chatName);
    },

    upMessage: async function (req, res) {
        const newMessage = new UserMessage({
            id: req.body.id,
            user: req.body.user,
            msg: req.body.msg
        });
        try {
            const messageSalva = await newMessage.save();
            res.send(messageSalva);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getAllMessages: async function (req, res) {
        try {
            const log = await UserMessage.find();
            res.status(200).send(log);
        } catch (error) {
            res.status(500).send("Erro ao buscar as mensagens");
        }
    },
}




module.exports = userController;