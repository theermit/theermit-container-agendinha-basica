const bdService = require("../services/bdService");
module.exports = (req, res, next) => {
    const email = req.body.email;
    var email_ja_esta_cadastrado = false;
    var senhas_nao_conferem = false;
    var bad_request = false;
    bdService.Usuario
        .findOne({
            where: {
                email: email
            }
        })
        .then(contato => {
            if(contato != null)
            {
                email_ja_esta_cadastrado = true;
                bad_request = true;
            }
            if(!req.body.nome || !req.body.senha || !req.body.confirmacao_senha)
            {
                return res.render("mensagem.njk", { 
                    mensagem: "requisição inválida",
                    link: "/cadastro"
                });
            }
                
            
            if(req.body.senha != req.body.confirmacao_senha)
            {
                senhas_nao_conferem = true;
                bad_request = true;
            }

            if(!bad_request)
                next();
            else 
                return res.render("cadastrar.njk", { 
                    senhas_nao_conferem: senhas_nao_conferem,
                    email_ja_esta_cadastrado: email_ja_esta_cadastrado,
                    email: req.body.email,
                    nome: req.body.nome,
                    senha: req.body.senha,
                    confirmacao_senha: req.body.confirmacao_senha
                });
        })
        .catch((err) => {
            return res.render("mensagem.njk", {
                mensagem: "Falha na consulta ao banco de dados!",
                link: "/login"
            });
        });

    
};