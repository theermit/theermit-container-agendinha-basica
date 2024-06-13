const bdService = require("../services/bdService");

module.exports = {
    exibir_lista: (req, res) => {
        bdService.Contato
            .findAll({
                where: {
                    UsuarioId: req.session.user_id
                }
            })
            .then(contatos => {
                res.render("lista_contatos.njk",{
                    contatos: contatos
                });
            })
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na consulta ao banco de dados!",
                link: "/login"
            }));
    },
    exibir_form_novo: (req, res) => {
        res.render("form_contato.njk", { acao: 'incluir_contato' });
    },
    processar_incluir_novo_contato: (req, res) => {
        delete req.body.id;
        let novo_contato = req.body;
        novo_contato.UsuarioId = req.session.user_id;
        bdService.Contato
            .create(novo_contato)
            .then(res.render("mensagem.njk", {
                mensagem: "Contato criado com sucesso!",
                link: "/lista"
            }))
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na criação do contato!",
                link: "/lista"
            }));
    },
    exibir_form_editar: (req, res) => {
        bdService.Contato 
            .findAll({
                where: {
                    id: req.params.contato_id,
                    UsuarioId: req.session.user_id
                }
            })
            .then(contatos => {
                if(contatos.length > 0)
                {
                    res.render("form_contato.njk", { 
                        acao: 'editar_contato',
                        contato: contatos[0]
                    });
                }
                else 
                {
                    res.render("mensagem.njk", {
                        mensagem: "Requisição inválida!",
                        link: "/lista"
                    });
                }
            })
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na consulta ao contato!",
                link: "/lista"
            }));
        
    },
    processar_editar_contato: (req, res) => {
        bdService.Contato
            .update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(res.render("mensagem.njk", {
                mensagem: "Contato alterado com sucesso!",
                link: "/lista"
            }))
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na alteração do contato!",
                link: "/lista"
            }));
    },
    exibir_form_apagar_contato: (req, res) => {
        bdService.Contato 
            .findAll({
                where: {
                    id: req.params.contato_id,
                    UsuarioId: req.session.user_id
                }
            })
            .then(contatos => {
                if(contatos.length > 0)
                {
                    res.render("form_contato.njk", { 
                        acao: 'apagar_contato',
                        contato: contatos[0]
                    });
                }
                else 
                {
                    res.render("mensagem.njk", {
                        mensagem: "Requisição inválida!",
                        link: "/lista"
                    });
                }
            })
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na consulta ao contato!",
                link: "/lista"
            }));
    },
    processar_apagar_contato: (req, res) => {
        bdService.Contato
            .destroy({
                where: {
                    id: req.body.id,
                    UsuarioId: req.session.user_id
                }
            })
            .then(res.render("mensagem.njk", {
                mensagem: "Contato excluído com sucesso!",
                link: "/lista"
            }))
            .catch((err) => res.render("mensagem.njk", {
                mensagem: "Falha na exclusão do contato!",
                link: "/lista"
            }));
    }
};