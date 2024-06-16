const bdService = require("../services/bdService");

module.exports = {
    exibir_lista: async (req, res) => {
        try
        {
            contatos = await bdService.Contato
                .findAll({
                    where: {
                        UsuarioId: req.id
                    }
                }); 
            usuario = await bdService.Usuario
                .findByPk(req.id);
            return res.json({ "contatos": contatos, "nome_usuario": usuario.nome });
        }
        catch(err)
        {
            return res.status(500).json({"mensagem": "falha na consulta aos contatos."});
        };
    },
    incluir_novo_contato: async (req, res) => {
        delete req.body.id;
        let novo_contato = req.body;
        novo_contato.UsuarioId = req.id;
        try {
            await bdService.Contato.create(novo_contato);
            return res.status(201).json({"mensagem": "contato criado."});
        }
        catch (err)
        {
            return res.status(500).json()
        }
    },
    editar_contato: async (req, res) => {
        try
        {
            await bdService.Contato
            .update(req.body, {
                where: {
                    id: req.params.contato_id,
                    UsuarioId: req.id
                }
            });
            return res.status(200).json({"mensagem": "contato alterado"});
        }
        catch(err)
        {
            return res.status(500).json({"mensagem": err});
        }
        
            
    },
    apagar_contato: async (req, res) => {
        try
        {
            await bdService.Contato
            .destroy({
                where: {
                    id: req.params.contato_id,
                    UsuarioId: req.id
                }
            });
            return res.status(204).end();
        }
        catch(err)
        {
            return res.status(500).end();
        }
    },
    selecionar_contato: async (req, res) => {
        try
        {
            contato = await bdService.Contato
                .findOne({
                    where: {
                        UsuarioId: req.id,
                        id: req.params.contato_id
                    }
                }); 
            if(!contato)
                return res.status(404).end();
            else
                return res.json(contato);
        }
        catch(err)
        {
            return res.status(500).json({"mensagem": "falha na consulta ao contato."});
        };
    },
};