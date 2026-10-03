const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Acesso negado");

    try{
    const usuarioVerificado = jwt.verify(token, process.env.TOKEN_SECRET);
    req.usuario = usuarioVerificado;
    next()
    } catch(error){
         res.status(401).send("Acesso negado");
    }
}