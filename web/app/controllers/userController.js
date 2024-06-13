module.exports = {
    sair_do_app: (req, res) => {
        req.session.user_id = null;
        res.render("mensagem.njk", {
            mensagem: "Você saiu do sistema.",
            link: "/logar"
        });
    },
    logar: (req, res) => {
        res.render("logar.njk", {});
    },
    cadastrar: (req, res) => {
        res.render("cadastrar.njk", {});
    },
    processar_cadastro: (req, res) => {
        const bdService = require("../services/bdService");
        const md5 = require('md5');
        bdService.Usuario
            .create({
                nome: req.body.nome,
                email: req.body.email,
                senha: md5(req.body.senha)
            })
            .then(res.render("mensagem.njk", {
                mensagem: "Cadastro efetuado com sucesso!",
                link: "/logar"
            }))
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha no cadastramento do usuário!",
                link: "/logar"
            }));
    },
    processar_logar: (req, res) => {
        const md5 = require('md5');
        const bdService = require("../services/bdService");
        bdService.Usuario
            .findOne({
                attributes: ['id'],
                where: {
                    email: req.body.email,
                    senha: md5(req.body.senha)
                }
            })
            .then((usuario) => {
                if(!usuario)
                {
                    return res.render("logar.njk", {
                        falha_login: true,
                        email: req.body.email
                    });
                }
                else 
                {
                    req.session.user_id = usuario.id;
                    res.redirect(301, '/lista');
                }
            })
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na consulta ao banco de dados!",
                link: "/logar"
            }));
    },
};