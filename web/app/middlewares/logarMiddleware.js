module.exports = (req, res, next) => {
    if(!req.body.email || !req.body.senha)
    {
        return res.render("mensagem.njk", { 
            mensagem: "requisição inválida",
            link: "/logar"
        });
    }
    else 
        next();
};