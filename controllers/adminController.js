const ChatName = require('../models/ChatName');
const UserMessage = require('../models/UserMessage');

const adminController = {

    adminConfirmed: function (req, res) {
            res.send(req.usuario.admin);
    },

    tradeName: async function (req, res) {
        if (!req.usuario.admin) return res.status(401).send("Acesso negado, você não é admin");
        try{
        let nameForTrade = await ChatName.findOne({nome: req.query.nome});
        if(!nameForTrade) return res.status(400).send("Erro: nome de chat atual não encontrado.");

            let newName = await ChatName.findByIdAndUpdate(nameForTrade._id, {nome: req.body.novoNome}, { returnDocument: "after"});
            res.send(newName.nome);
        } catch (error){
            res.status(401).send("Houve algum erro: "+ error.message);
        }
    },

    msgDel: async function (req, res) {
        if (!req.usuario.admin) return res.status(401).send("Acesso negado, você não é admin");
        try{
            const resultado = await UserMessage.deleteMany({});
            res.status(200).send(resultado);
        } catch(error) {
            res.status(500).send("Erro: não foi possivel deletar as mensagens");
        }
    },

    criandoNome: async function (req, res) {
        if(!req.body.nome) return res.status(403).sendo("Precisa de nome");
        const nome = new ChatName({
            nome: req.body.nome
        });
        try{
        const nomeSalvo = await nome.save();
            res.send(nomeSalvo)
        } catch (error){
            console.log(error);
        }
    },
};

module.exports = adminController;