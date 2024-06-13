module.exports = (req, res, next) => {
    if(req.body.nome.length == 0 || req.body.telefone.length == 0)
        return res.render("mensagem.njk", { 
            mensagem: "requisição inválida",
            link: "/lista"
        });
    else 
        next();
};